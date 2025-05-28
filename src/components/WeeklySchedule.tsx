// src/components/WeeklySchedule.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, Users } from 'lucide-react';

// Program colors configuration
export const PROGRAM_COLORS = {
  kids4to8: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    text: 'text-blue-800',
    accent: 'bg-blue-500'
  },
  kids9to11: {
    bg: 'bg-green-100',
    border: 'border-green-300', 
    text: 'text-green-800',
    accent: 'bg-green-500'
  },
  kids11to13: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    text: 'text-purple-800', 
    accent: 'bg-purple-500'
  },
  kids6to12: {
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    text: 'text-orange-800',
    accent: 'bg-orange-500'
  },
  youthAdults: {
    bg: 'bg-red-100',
    border: 'border-red-300',
    text: 'text-red-800',
    accent: 'bg-red-500'
  }
};

interface ClassSession {
  id: string;
  programKey: string;
  ageRange: string;
  startTime: string;
  endTime: string;
  colorScheme: keyof typeof PROGRAM_COLORS;
}

interface DaySchedule {
  dayKey: string;
  sessions: ClassSession[];
}

const WeeklySchedule: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl' || i18n.language === 'ar';

  // Schedule data based on your requirements
  const weeklySchedule: DaySchedule[] = [
    {
      dayKey: 'monday',
      sessions: [
        {
          id: 'mon-1',
          programKey: 'kids4to8',
          ageRange: '4-8',
          startTime: '19:30',
          endTime: '20:30',
          colorScheme: 'kids4to8'
        },
        {
          id: 'mon-2', 
          programKey: 'kids9to11',
          ageRange: '9-11',
          startTime: '20:30',
          endTime: '21:30',
          colorScheme: 'kids9to11'
        },
        {
          id: 'mon-3',
          programKey: 'kids11to13', 
          ageRange: '11-13',
          startTime: '21:30',
          endTime: '22:30',
          colorScheme: 'kids11to13'
        }
      ]
    },
    {
      dayKey: 'tuesday',
      sessions: [
        {
          id: 'tue-1',
          programKey: 'kids6to12',
          ageRange: '6-12', 
          startTime: '21:00',
          endTime: '22:00',
          colorScheme: 'kids6to12'
        },
        {
          id: 'tue-2',
          programKey: 'youthAdults',
          ageRange: '14+',
          startTime: '22:00',
          endTime: '23:00',
          colorScheme: 'youthAdults'
        }
      ]
    },
    {
      dayKey: 'wednesday',
      sessions: [
        {
          id: 'wed-1',
          programKey: 'kids4to8',
          ageRange: '4-8',
          startTime: '19:30', 
          endTime: '20:30',
          colorScheme: 'kids4to8'
        },
        {
          id: 'wed-2',
          programKey: 'kids9to11',
          ageRange: '9-11',
          startTime: '20:30',
          endTime: '21:30', 
          colorScheme: 'kids9to11'
        },
        {
          id: 'wed-3',
          programKey: 'kids11to13',
          ageRange: '11-13',
          startTime: '21:30',
          endTime: '22:30',
          colorScheme: 'kids11to13'
        }
      ]
    },
    {
      dayKey: 'thursday',
      sessions: [
        {
          id: 'thu-1',
          programKey: 'kids6to12',
          ageRange: '6-12',
          startTime: '21:00',
          endTime: '22:00',
          colorScheme: 'kids6to12'
        },
        {
          id: 'thu-2',
          programKey: 'youthAdults', 
          ageRange: '14+',
          startTime: '22:00',
          endTime: '23:00',
          colorScheme: 'youthAdults'
        }
      ]
    },
    {
      dayKey: 'friday',
      sessions: [
        {
          id: 'fri-1',
          programKey: 'kids4to8',
          ageRange: '4-8',
          startTime: '19:30',
          endTime: '20:30',
          colorScheme: 'kids4to8'
        },
        {
          id: 'fri-2',
          programKey: 'kids9to11',
          ageRange: '9-11', 
          startTime: '20:30',
          endTime: '21:30',
          colorScheme: 'kids9to11'
        },
        {
          id: 'fri-3',
          programKey: 'kids11to13',
          ageRange: '11-13',
          startTime: '21:30',
          endTime: '22:30',
          colorScheme: 'kids11to13'
        }
      ]
    },
    {
      dayKey: 'saturday',
      sessions: [
        {
          id: 'sat-1',
          programKey: 'kids6to12',
          ageRange: '6-12',
          startTime: '21:00', 
          endTime: '22:00',
          colorScheme: 'kids6to12'
        },
        {
          id: 'sat-2',
          programKey: 'youthAdults',
          ageRange: '14+',
          startTime: '22:00',
          endTime: '23:00',
          colorScheme: 'youthAdults'
        }
      ]
    },
    {
      dayKey: 'sunday',
      sessions: []
    }
  ];

  // Only complete hours for the time column
  const timeSlots = [
    '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  // Helper function to check if a session should be displayed in a time slot
  const getSessionsForTimeSlot = (sessions: ClassSession[], timeSlot: string) => {
    const timeSlotHour = parseInt(timeSlot.split(':')[0]);
    return sessions.filter(session => {
      const startHour = parseInt(session.startTime.split(':')[0]);
      const startMinute = parseInt(session.startTime.split(':')[1]);
      // const endHour = parseInt(session.endTime.split(':')[0]);
      
      // If session starts at :30, it should appear in the next hour slot
      // If session starts at :00, it should appear in the current hour slot
      if (startMinute === 30) {
        return timeSlotHour === startHour + 1;
      } else {
        return timeSlotHour === startHour;
      }
    });
  };

  return (
    <section className="py-16 bg-white " dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {t('schedule.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('schedule.subtitle')}
          </p>
        </div>

        {/* Programs Legend */}
        <div className="mb-8 bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Users size={20} />
            {t('schedule.programs')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(PROGRAM_COLORS).map(([program, colors]) => (
              <div 
                key={program}
                className={`flex items-center gap-3 p-3 rounded-lg border ${colors.bg} ${colors.border}`}
              >
                <div className={`w-4 h-4 rounded-full ${colors.accent}`} />
                <span className={`font-medium ${colors.text}`}>
                  {t(`schedule.programTypes.${program}`)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule Grid */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Header with Days */}
          <div className="grid grid-cols-8 bg-gray-800 text-white">
            <div className="p-4 font-semibold flex items-center gap-2">
              <Clock size={18} />
              {t('schedule.time')}
            </div>
            {weeklySchedule.map((day) => (
              <div key={day.dayKey} className="p-4 text-center font-semibold">
                {t(`schedule.days.${day.dayKey}`)}
              </div>
            ))}
          </div>

          {/* Time Grid */}
          <div className="divide-y divide-gray-200">
            {timeSlots.map((timeSlot) => (
              <div key={timeSlot} className="grid grid-cols-8 min-h-20">
                
                {/* Time Column */}
                <div className="p-4 bg-gray-50 font-medium text-gray-700 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-lg font-bold">{timeSlot}</div>
                  </div>
                </div>

                {/* Day Columns */}
                {weeklySchedule.map((day) => {
                  const sessionsAtTime = getSessionsForTimeSlot(day.sessions, timeSlot);

                  return (
                    <div key={`${day.dayKey}-${timeSlot}`} className="p-2 border-r border-gray-200 relative">
                      {sessionsAtTime.map((session) => {
                        const colors = PROGRAM_COLORS[session.colorScheme];
                        
                        return (
                          <div
                            key={session.id}
                            className={`
                              ${colors.bg} ${colors.border} ${colors.text}
                              border-2 rounded-lg p-3 h-full
                              hover:shadow-md transition-shadow duration-200
                              cursor-pointer flex flex-col justify-center
                            `}
                          >
                            <div className="text-xs font-bold mb-1">
                              {t(`schedule.programTypes.${session.programKey}`)}
                            </div>
                            <div className="text-xs mb-1">
                              {t('schedule.ages')}: {session.ageRange}
                            </div>
                            <div className="text-xs font-semibold text-center bg-white bg-opacity-50 rounded px-2 py-1">
                              {session.startTime} - {session.endTime}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            {t('schedule.note')}
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
            {t('schedule.registerNow')}
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default WeeklySchedule;