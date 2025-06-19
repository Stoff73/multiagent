'use client';

import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format, addDays, isToday, isTomorrow, isBefore, isAfter, addMinutes } from 'date-fns';
import { parseISO } from 'date-fns/parseISO';
import { useAgent } from '@/contexts/AgentContext';

interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

// Generate time slots for a given date
const generateTimeSlots = (date: Date, busySlots: Array<{start: string, end: string}> = []): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const slotDuration = 30; // minutes
  
  // Create slots from 9 AM to 5 PM in 30-minute increments
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minutes = 0; minutes < 60; minutes += slotDuration) {
      const start = new Date(date);
      start.setHours(hour, minutes, 0, 0);
      
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + slotDuration);
      
      // Check if this slot is available (not in busy slots)
      const isBusy = busySlots.some(busy => {
        const busyStart = parseISO(busy.start);
        const busyEnd = parseISO(busy.end);
        return (
          (isAfter(start, busyStart) && isBefore(start, busyEnd)) ||
          (isAfter(busyStart, start) && isBefore(busyStart, end)) ||
          (start.getTime() === busyStart.getTime() && end.getTime() === busyEnd.getTime())
        );
      });
      
      // Only show future time slots
      const now = new Date();
      const isFuture = isAfter(start, now);
      
      if (isFuture) {
        slots.push({
          start,
          end,
          available: !isBusy
        });
      }
    }
  }
  
  return slots;
};

// Format date for display
const formatDate = (date: Date): string => {
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  return format(date, 'EEEE, MMM d');
};

export default function FreeSlotPicker() {
  const { activeAgent } = useAgent();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  // Mock busy slots - in a real app, this would come from an API
  const [busySlots] = useState([
    { start: '2025-06-18T11:00:00', end: '2025-06-18T12:00:00' },
    { start: '2025-06-18T14:30:00', end: '2025-06-18T15:30:00' },
  ]);
  
  // Load time slots when date changes
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call
    const timer = setTimeout(() => {
      const slots = generateTimeSlots(selectedDate, busySlots);
      setTimeSlots(slots);
      setSelectedSlot(null);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [selectedDate, busySlots]);
  
  const handleDateChange = (days: number) => {
    const newDate = addDays(selectedDate, days);
    setSelectedDate(newDate);
  };
  
  const handleSchedule = () => {
    if (!selectedSlot) return;
    // In a real app, this would open a scheduling modal or call an API
    alert(`Meeting scheduled for ${format(selectedSlot, 'MMMM d, yyyy h:mm a')}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Schedule a Meeting</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span>{formatDate(selectedDate)}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <button 
          onClick={() => handleDateChange(-1)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          aria-label="Previous day"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="text-sm font-medium">
          {format(selectedDate, 'MMMM d, yyyy')}
        </div>
        
        <button 
          onClick={() => handleDateChange(1)}
          className="p-1 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700"
          aria-label="Next day"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : timeSlots.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ClockIcon className="mx-auto h-8 w-8 text-gray-300 mb-2" />
          <p>No available time slots</p>
          <p className="text-sm mt-1">Try selecting another date</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
            {timeSlots.map((slot, index) => {
              const isSelected = selectedSlot?.getTime() === slot.start.getTime();
              return (
                <button
                  key={index}
                  onClick={() => setSelectedSlot(slot.start)}
                  disabled={!slot.available}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : slot.available
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {format(slot.start, 'h:mm a')}
                </button>
              );
            })}
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button 
              onClick={handleSchedule}
              disabled={!selectedSlot}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                selectedSlot
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              Schedule Meeting
            </button>
          </div>
        </>
      )}
    </div>
  );
}
