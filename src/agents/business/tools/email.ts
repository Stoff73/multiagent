import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
  cc?: string[];
  bcc?: string[];
}

export class EmailService {
  private gmail: any;
  private oauth2Client: OAuth2Client;

  constructor(accessToken: string) {
    this.oauth2Client = new google.auth.OAuth2();
    this.oauth2Client.setCredentials({ access_token: accessToken });
    
    this.gmail = google.gmail({
      version: 'v1',
      auth: this.oauth2Client,
    });
  }

  private createEmailBody({ to, subject, body, cc = [], bcc = [] }: EmailOptions) {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      `Content-Type: text/plain; charset=utf-8`,
      'MIME-Version: 1.0',
      'Content-Transfer-Encoding: 7bit',
      '',
      body,
    ];

    if (cc.length > 0) {
      email.splice(2, 0, `Cc: ${cc.join(', ')}`);
    }
    
    if (bcc.length > 0) {
      email.splice(2, 0, `Bcc: ${bcc.join(', ')}`);
    }

    return Buffer.from(email.join('\n'))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  async sendEmail(options: EmailOptions) {
    try {
      const response = await this.gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: this.createEmailBody(options),
        },
      });

      return {
        success: true,
        messageId: response.data.id,
        threadId: response.data.threadId,
      };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async listEmails(query: string = 'in:inbox', maxResults: number = 10) {
    try {
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults,
      });

      const messages = response.data.messages || [];
      const emails = [];

      for (const message of messages) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'metadata',
          metadataHeaders: ['From', 'To', 'Subject', 'Date'],
        });

        emails.push({
          id: message.id,
          snippet: email.data.snippet,
          headers: email.data.payload?.headers?.reduce((acc: any, header: any) => {
            acc[header.name.toLowerCase()] = header.value;
            return acc;
          }, {}),
        });
      }

      return emails;
    } catch (error) {
      console.error('Error listing emails:', error);
      throw new Error('Failed to list emails');
    }
  }
}
