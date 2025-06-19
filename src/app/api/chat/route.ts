import { NextResponse } from 'next/server';
import { BusinessAgent } from '@/agents/business/agent';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
    interface ChatContext {
      agent?: string;
      [key: string]: any;
    }
    
    let message: string;
    let context: ChatContext = {};
    
    try {
      const body = await req.json();
      message = body.message;
      context = body.context || {};
    } catch (error) {
      console.error('Error parsing request body:', error);
      return NextResponse.json(
        { 
          error: 'Invalid request',
          message: 'Could not parse request body as JSON.'
        },
        { status: 400 }
      );
    }
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { 
          error: 'Message is required',
          message: 'Please provide a valid message.'
        },
        { status: 400 }
      );
    }

    console.log('Processing message from user:', session.user?.email);
    
    try {
      // Initialize the business agent with the user's access token
      const agent = new BusinessAgent(session.accessToken);
      
      // Process the message with the user's and agent's context
      const result = await agent.processMessage(message, {
        ...context,
        userId: session.user?.email,
        name: session.user?.name,
        agent: context.agent || 'sme', // Default to 'sme' if no agent specified
        timestamp: new Date().toISOString(),
        sessionId: session.user?.email ? `user-${session.user.email.split('@')[0]}` : 'anonymous'
      });

      console.log('Successfully processed message');
      return NextResponse.json(result);
      
    } catch (agentError) {
      console.error('Agent processing error:', agentError);
      const errorMessage = agentError instanceof Error ? agentError.message : 'Unknown error';
      
      // Handle specific error cases
      if (errorMessage.includes('OpenAI API key')) {
        return NextResponse.json(
          { 
            error: 'Configuration Error',
            message: 'The chat service is not properly configured. Please contact support.'
          },
          { status: 500 }
        );
      }
      
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        message: `An unexpected error occurred: ${errorMessage}`
      },
      { status: 500 }
    );
  }
}
