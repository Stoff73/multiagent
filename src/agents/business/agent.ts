import { OpenAI } from 'openai';
import { loadYaml } from '@/lib/utils/yaml';
import path from 'path';
import fs from 'fs';
import { CalendarService } from './tools/calendar';
import { EmailService } from './tools/email';
import { DocsService } from './tools/docs';

interface AgentConfig {
  name: string;
  description: string;
  instructions: string;
  model: string;
  temperature: number;
  profile_picture_url: string;
  tools: string[];
}

export class BusinessAgent {
  private openai: OpenAI;
  private config: AgentConfig;
  private calendarService?: CalendarService;
  private emailService?: EmailService;
  private docsService?: DocsService;

  constructor(accessToken?: string) {
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured. Please set the OPENAI_API_KEY environment variable.');
      throw new Error('OpenAI API key is not configured');
    }

    try {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
      
      // Load agent configuration
      const configPath = path.join(process.cwd(), 'docs/agents/business.yaml');
      if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at: ${configPath}`);
      }
      
      this.config = loadYaml(fs.readFileSync(configPath, 'utf-8'));

      // Initialize services if access token is provided
      if (accessToken) {
        this.initializeServices(accessToken);
      }
    } catch (error) {
      console.error('Failed to initialize BusinessAgent:', error);
      throw new Error(`Failed to initialize BusinessAgent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private initializeServices(accessToken: string) {
    try {
      this.calendarService = new CalendarService(accessToken);
      this.emailService = new EmailService(accessToken);
      this.docsService = new DocsService(accessToken);
    } catch (error) {
      console.error('Failed to initialize services:', error);
      throw new Error('Failed to initialize agent services');
    }
  }

  async processMessage(message: string, context: Record<string, any> = {}) {
    try {
      // Check for tool usage patterns in the message
      const toolResponse = await this.handleTools(message, context);
      if (toolResponse) {
        return toolResponse;
      }

      // If no tools were used, proceed with standard chat completion
      const response = await this.openai.chat.completions.create({
        model: this.config.model,
        messages: [
          { role: 'system', content: this.config.instructions },
          { role: 'user', content: message },
        ],
        temperature: this.config.temperature,
      });

      return {
        response: response.choices[0]?.message?.content || 'I apologize, but I am unable to respond at the moment.',
        context: {
          ...context,
          lastInteraction: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Error processing message:', error);
      throw new Error('Failed to process message');
    }
  }

  private async handleTools(message: string, context: Record<string, any>) {
    // Check for calendar-related queries
    if (message.toLowerCase().includes('schedule') || message.toLowerCase().includes('meeting')) {
      if (!this.calendarService) {
        throw new Error('Calendar service not initialized. Please authenticate first.');
      }
      
      // Extract meeting details (simplified example)
      const timeMatch = message.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|am|pm)?)/);
      const dateMatch = message.match(/(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}\/\d{1,2}\/\d{2,4})/i);
      
      if (timeMatch && dateMatch) {
        const slots = await this.calendarService.getAvailableSlots(new Date().toISOString());
        return {
          response: `I found some available time slots for ${dateMatch[0]} around ${timeMatch[0]}. Would you like me to schedule a meeting?`,
          context: {
            ...context,
            availableSlots: slots,
            lastInteraction: new Date().toISOString(),
          },
        };
      }
    }

    // Check for email-related queries
    if (message.toLowerCase().includes('email') || message.toLowerCase().includes('inbox')) {
      if (!this.emailService) {
        throw new Error('Email service not initialized. Please authenticate first.');
      }
      
      const emails = await this.emailService.listEmails('in:inbox', 5);
      const emailList = emails.map((email: any) => 
        `From: ${email.headers.from}, Subject: ${email.headers.subject}`
      ).join('\n');
      
      return {
        response: `Here are your recent emails:\n${emailList}`,
        context: {
          ...context,
          lastEmailCheck: new Date().toISOString(),
        },
      };
    }

    // Check for document-related queries
    if (message.toLowerCase().includes('document') || message.toLowerCase().includes('doc')) {
      if (!this.docsService) {
        throw new Error('Document service not initialized. Please authenticate first.');
      }
      
      const docs = await this.docsService.listDocuments();
      const docList = docs.map((doc: any) => doc.name).join('\n');
      
      return {
        response: `Here are your recent documents:\n${docList}`,
        context: {
          ...context,
          lastDocCheck: new Date().toISOString(),
        },
      };
    }

    return null;
  }

  // Calendar methods
  async scheduleMeeting(event: any) {
    if (!this.calendarService) {
      throw new Error('Calendar service not initialized');
    }
    return this.calendarService.createEvent(event);
  }

  async getAvailableSlots(date: string, durationMinutes: number = 30) {
    if (!this.calendarService) {
      throw new Error('Calendar service not initialized');
    }
    return this.calendarService.getAvailableSlots(date, durationMinutes);
  }

  // Email methods
  async sendEmail(options: any) {
    if (!this.emailService) {
      throw new Error('Email service not initialized');
    }
    return this.emailService.sendEmail(options);
  }

  async listEmails(query: string = 'in:inbox', maxResults: number = 10) {
    if (!this.emailService) {
      throw new Error('Email service not initialized');
    }
    return this.emailService.listEmails(query, maxResults);
  }

  // Document methods
  async createDocument(title: string, content: string = '') {
    if (!this.docsService) {
      throw new Error('Document service not initialized');
    }
    return this.docsService.createDocument(title, content);
  }

  async getDocument(documentId: string) {
    if (!this.docsService) {
      throw new Error('Document service not initialized');
    }
    return this.docsService.getDocument(documentId);
  }

  async listDocuments(query: string = '') {
    if (!this.docsService) {
      throw new Error('Document service not initialized');
    }
    return this.docsService.listDocuments(query);
  }
}
