import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { NewsItem } from './types';

// Import news data
import { news as news20240319 } from './data/news-2024-03-19';
import { news as news20240318 } from './data/news-2024-03-18';

const newsData: { [key: string]: NewsItem[] } = {
  '2024-03-19': news20240319,
  '2024-03-18': news20240318,
};

function App() {
  const [currentDate, setCurrentDate] = useState('2024-03-19');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const currentNews = newsData[currentDate] || [];
  const currentItem = currentNews[currentIndex];

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleNext = () => {
    if (currentIndex < currentNews.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleDateSelect = (date: any) => {
    const formattedDate = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    if (newsData[formattedDate]) {
      setCurrentDate(formattedDate);
      setCurrentIndex(0);
    }
    setShowCalendar(false);
  };

  if (!currentItem) {
    return <div>No news available for this date.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Daily News</h1>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
          >
            <CalendarIcon size={20} />
            <span>{currentDate}</span>
          </button>
        </div>

        {/* Calendar Popup */}
        {showCalendar && (
          <div className="absolute right-4 mt-2 bg-white rounded-lg shadow-xl z-10">
            <Calendar
              value={{
                year: parseInt(currentDate.split('-')[0]),
                month: parseInt(currentDate.split('-')[1]),
                day: parseInt(currentDate.split('-')[2])
              }}
              onChange={handleDateSelect}
              shouldHighlightWeekends
            />
          </div>
        )}

        {/* News Card */}
        <div className="relative" {...handlers}>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={currentItem.logo}
                  alt={currentItem.source}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{currentItem.source}</h2>
                  <span className="text-sm text-gray-500">{currentItem.category}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">{currentItem.title}</h3>
              <p className="text-gray-600 mb-6">{currentItem.summary}</p>
              <a
                href={currentItem.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read More
              </a>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className={`p-2 rounded-full bg-white shadow-lg pointer-events-auto ${
                currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              disabled={currentIndex === 0}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className={`p-2 rounded-full bg-white shadow-lg pointer-events-auto ${
                currentIndex === currentNews.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
              }`}
              disabled={currentIndex === currentNews.length - 1}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {currentNews.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;