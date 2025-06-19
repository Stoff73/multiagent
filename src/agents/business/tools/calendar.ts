import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { addMinutes, format, parse } from 'date-fns';

interface CalendarEvent {
  summary: string;
  description?: string;
  start: string;
  end: string;
  attendees?: Array<{ email: string }>;
}

export class CalendarService {
  private calendar: any;
  private oauth2Client: OAuth2Client;

  constructor(accessToken: string) {
    this.oauth2Client = new google.auth.OAuth2();
    this.oauth2Client.setCredentials({ access_token: accessToken });
    
    this.calendar = google.calendar({
      version: 'v3',
      auth: this.oauth2Client,
    });
  }

  async createEvent(event: CalendarEvent) {
    try {
      const response = await this.calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.summary,
          description: event.description,
          start: { dateTime: event.start, timeZone: 'UTC' },
          end: { dateTime: event.end, timeZone: 'UTC' },
          attendees: event.attendees,
        },
        conferenceDataVersion: 1,
      });

      return response.data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw new Error('Failed to create calendar event');
    }
  }

  async getAvailableSlots(date: string, durationMinutes: number = 30) {
    try {
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);

      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      const slots: Array<{ start: string; end: string }> = [];
      
      // Generate time slots for the day
      let currentTime = new Date(startDate);
      currentTime.setHours(9, 0, 0, 0); // Start at 9 AM
      
      while (currentTime.getHours() < 17) { // Until 5 PM
        const slotEnd = addMinutes(currentTime, durationMinutes);
        const slot = {
          start: currentTime.toISOString(),
          end: slotEnd.toISOString(),
        };

        // Check if slot is available
        const isBusy = events.some((event: any) => {
          const eventStart = new Date(event.start.dateTime || event.start.date);
          const eventEnd = new Date(event.end.dateTime || event.end.date);
          return (
            (currentTime >= eventStart && currentTime < eventEnd) ||
            (slotEnd > eventStart && slotEnd <= eventEnd) ||
            (currentTime <= eventStart && slotEnd >= eventEnd)
          );
        });

        if (!isBusy) {
          slots.push(slot);
        }

        currentTime = slotEnd;
      }

      return slots;
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw new Error('Failed to fetch available time slots');
    }
  }

  async listEvents(timeMin: string, timeMax: string) {
    try {
      const response = await this.calendar.events.list({
        calendarId: 'primary',
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime',
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error listing events:', error);
      throw new Error('Failed to list calendar events');
    }
  }
}
