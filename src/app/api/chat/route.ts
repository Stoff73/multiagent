import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { run } from '@openai/agents';
import { AGENTS, AgentType } from '@/agents/config/businessAgent';

interface ChatRequest {
  message: string;
  context?: {
    agent?: AgentType;
    [key: string]: any;
  };
}

export async function POST(req: Request) {
  try {
    console.log('Chat API request received');
    
    // Verify authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      console.warn('Unauthorized chat request - no session');
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'You must be signed in to use the chat feature.'
        },
        { status: 401 }
      );
    }

    // Parse request body
    let requestBody: ChatRequest;
    
    try {
      requestBody = await req.json();
      if (!requestBody.message || typeof requestBody.message !== 'string') {
        throw new Error('Message is required and must be a string');
      }
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { 
          error: 'Invalid request',
          message: 'Invalid request body. Please provide a valid message.'
        },
        { status: 400 }
      );
    }

    const { message, context = {} } = requestBody;
    // Ensure the agent type is valid, default to 'sme' if not
    const agentType: AgentType = 
      context.agent && ['admin', 'nutrition', 'fitness', 'sme'].includes(context.agent) 
        ? context.agent as AgentType 
        : 'sme';
    
    console.log(`Processing message from user: ${session.user?.email} using agent: ${agentType}`);
    
    try {
      // Get the appropriate agent - default to 'sme' if not found
      const agentToUse = AGENTS[agentType as keyof typeof AGENTS] || AGENTS.sme;

      // Add user context to the message
      const userContext = `
        [User Context]
        - Name: ${session.user?.name || 'Not provided'}
        - Email: ${session.user?.email || 'Not provided'}
        - Current Time: ${new Date().toLocaleString()}
      `;

      const fullMessage = `${userContext}\n\n${message}`;

      // Run the agent with the message
      const result = await run(agentToUse, fullMessage);

      console.log('Successfully processed message');
      return NextResponse.json({
        response: result.finalOutput,
        context: {
          ...context,
          lastInteraction: new Date().toISOString(),
          agent: agentType
        }
      });
      
    } catch (error) {
      console.error('Agent processing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      
      return NextResponse.json(
        { 
          error: 'Processing Error',
          message: `Failed to process message: ${errorMessage}`
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected chat error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: 'An unexpected error occurred while processing your request.'
      },
      { status: 500 }
    );
  }
}
