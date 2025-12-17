'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

interface TimeSlot {
  date: string;
  time: string;
  dateTime: string;
  displayDate: string;
  displayTime: string;
}

export default function BookMeetingPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate available time slots for the next 7 days
  useEffect(() => {
    const generateSlots = () => {
      const slots: TimeSlot[] = [];
      const now = new Date();
      const businessHours = [9, 10, 11, 13]; // 9 AM to 5 PM (excluding 12 PM)
      
      // Generate slots for next 7 days
      for (let dayOffset = 1; dayOffset <= 2; dayOffset++) {
        const date = new Date(now);
        date.setDate(date.getDate() + dayOffset);
        
        // Skip weekends (optional - remove if you want weekends)
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip Sunday (0) and Saturday (6)
        
        const dateStr = date.toISOString().split('T')[0];
        const displayDate = date.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        });

        // Generate time slots for this day
        businessHours.forEach((hour) => {
          const slotDate = new Date(date);
          slotDate.setHours(hour, 0, 0, 0);
          
          // Skip if this time has already passed today
          if (dayOffset === 1 && slotDate <= now) return;
          
          const timeStr = slotDate.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          
          const endTime = new Date(slotDate);
          endTime.setHours(hour + 1, 0, 0, 0);
          
          slots.push({
            date: dateStr,
            time: `${hour}:00`,
            dateTime: slotDate.toISOString(),
            displayDate,
            displayTime: timeStr,
          });
        });
      }
      
      setAvailableSlots(slots);
      setLoading(false);
    };

    generateSlots();
  }, []);

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleContinue = () => {
    if (!selectedSlot) return;
    
    // Store selected slot in cookie (accessible server-side) and redirect to OAuth
    const endTime = new Date(new Date(selectedSlot.dateTime).getTime() + 60 * 60 * 1000).toISOString();
    const slotData = {
      startTime: selectedSlot.dateTime,
      endTime: endTime,
    };
    
    // Set cookie that expires in 10 minutes (enough time for OAuth flow)
    document.cookie = `selectedMeetingSlot=${encodeURIComponent(JSON.stringify(slotData))}; path=/; max-age=600; SameSite=Lax`;
    
    // Redirect to OAuth flow
    window.location.href = '/api/auth/google';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4"></div>
          <p className="text-foreground/70">Loading available slots...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Book a Meeting</h1>
          <p className="text-lg text-foreground/70">
            Select an available time slot for your meeting with Synexis.ai
          </p>
        </div>

        {selectedSlot && (
          <div className="mb-6 p-4 bg-foreground/5 border border-foreground/10 rounded-lg">
            <p className="text-sm text-foreground/70 mb-1">Selected Time:</p>
            <p className="text-lg font-semibold text-foreground">
              {selectedSlot.displayDate} at {selectedSlot.displayTime}
            </p>
            <p className="text-sm text-foreground/60 mt-1">Duration: 1 hour</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {availableSlots.map((slot, index) => (
            <button
              key={index}
              onClick={() => handleSlotSelect(slot)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                selectedSlot?.dateTime === slot.dateTime
                  ? 'border-foreground bg-foreground/10'
                  : 'border-foreground/20 hover:border-foreground/40 bg-background'
              }`}
            >
              <p className="font-semibold text-foreground">{slot.displayDate}</p>
              <p className="text-foreground/70 mt-1">{slot.displayTime}</p>
              <p className="text-xs text-foreground/50 mt-2">1 hour duration</p>
            </button>
          ))}
        </div>

        {availableSlots.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/70">No available slots found. Please try again later.</p>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => router.push('/contact')}
            variant="outline"
            className="px-6 py-3"
          >
            Cancel
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!selectedSlot}
            variant="default"
            className="px-6 py-3"
          >
            Continue to Google Calendar
          </Button>
        </div>

        <div className="mt-8 text-center text-sm text-foreground/60">
          <p>After selecting a time, you'll be redirected to Google to authorize calendar access.</p>
        </div>
      </div>
    </div>
  );
}

