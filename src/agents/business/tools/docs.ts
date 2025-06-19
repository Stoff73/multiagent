import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

interface DocumentContent {
  title: string;
  body: string;
}

export class DocsService {
  private docs: any;
  private drive: any;
  private oauth2Client: OAuth2Client;

  constructor(accessToken: string) {
    this.oauth2Client = new google.auth.OAuth2();
    this.oauth2Client.setCredentials({ access_token: accessToken });
    
    this.docs = google.docs({
      version: 'v1',
      auth: this.oauth2Client,
    });
    
    this.drive = google.drive({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  async createDocument(title: string, content: string = '') {
    try {
      // Create a new document
      const document = await this.docs.documents.create({
        requestBody: {
          title,
        },
      });

      // Add content if provided
      if (content) {
        await this.updateDocument(document.data.documentId!, content);
      }

      return {
        documentId: document.data.documentId,
        title: document.data.title,
        url: document.data.documentId ? `https://docs.google.com/document/d/${document.data.documentId}` : null,
      };
    } catch (error) {
      console.error('Error creating document:', error);
      throw new Error('Failed to create document');
    }
  }

  async getDocument(documentId: string) {
    try {
      const document = await this.docs.documents.get({
        documentId,
      });

      // Extract text content from the document
      const content = this.extractText(document.data);

      return {
        title: document.data.title || 'Untitled',
        content,
        documentId: document.data.documentId,
        url: `https://docs.google.com/document/d/${document.data.documentId}`,
      };
    } catch (error) {
      console.error('Error getting document:', error);
      throw new Error('Failed to get document');
    }
  }

  async updateDocument(documentId: string, content: string) {
    try {
      const requests = [
        {
          insertText: {
            location: {
              index: 1,
            },
            text: content,
          },
        },
      ];

      await this.docs.documents.batchUpdate({
        documentId,
        requestBody: {
          requests,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Error updating document:', error);
      throw new Error('Failed to update document');
    }
  }

  async listDocuments(query: string = '') {
    try {
      const response = await this.drive.files.list({
        q: "mimeType='application/vnd.google-apps.document' and trashed=false" + 
           (query ? ` and name contains '${query}'` : ''),
        fields: 'files(id, name, webViewLink, modifiedTime)',
        orderBy: 'modifiedTime desc',
        pageSize: 10,
      });

      return response.data.files || [];
    } catch (error) {
      console.error('Error listing documents:', error);
      throw new Error('Failed to list documents');
    }
  }

  private extractText(doc: any): string {
    if (!doc.body?.content) return '';
    
    return doc.body.content
      .map((contentItem: any) => {
        if (contentItem.paragraph) {
          return contentItem.paragraph.elements
            .map((element: any) => element.textRun?.content || '')
            .join('');
        }
        return '';
      })
      .filter((text: string) => text.trim() !== '')
      .join('\n');
  }
}
