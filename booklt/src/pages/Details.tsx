import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { experienceService } from '../services/api';
import type { Experience } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);

  useEffect(() => {
    if (id) {
      fetchExperience();
    }
  }, [id]);

  const fetchExperience = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getExperienceById(id!);
      setExperience(data);
      setError('');
    } catch (err) {
      setError('Failed to load experience details. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time slot');
      return;
    }

    const selectedSlot = experience?.slots.find(
      s => s.date === selectedDate && s.time === selectedTime
    );

    if (!selectedSlot) {
      alert('Selected slot not found');
      return;
    }

    if (numberOfPeople > selectedSlot.availableSpots) {
      alert(`Only ${selectedSlot.availableSpots} spots available for this slot`);
      return;
    }

    navigate('/checkout', {
      state: {
        experience,
        selectedSlot,
        numberOfPeople,
      },
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      short: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      full: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    };
  };

  const getUniqueSlots = () => {
    if (!experience) return { dates: [], times: [] };
    
    const dates = Array.from(new Set(experience.slots.map(s => s.date)));
    const times = selectedDate 
      ? experience.slots.filter(s => s.date === selectedDate)
      : [];
    
    return { dates, times };
  };

  const { dates, times } = getUniqueSlots();
  const selectedSlot = experience?.slots.find(
    s => s.date === selectedDate && s.time === selectedTime
  );
  const basePrice = selectedSlot ? selectedSlot.price * numberOfPeople : experience?.basePrice || 0;
  const taxes = Math.round(basePrice * 0.05);
  const total = basePrice + taxes;

  if (loading) return <LoadingSpinner />;

  if (error || !experience) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
          {error || 'Experience not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="max-w-[1400px] mx-auto px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-8 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-semibold text-base">Details</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-[420px] rounded-3xl overflow-hidden shadow-md">
              <img
                src={experience.imageUrl}
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title and Description */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {experience.title}
              </h1>
              <p className="text-gray-700 leading-relaxed text-base">
                {experience.description}
              </p>
            </div>

            {/* Choose Date */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Choose date</h2>
              <div className="flex flex-wrap gap-3">
                {dates.map((date) => {
                  const formatted = formatDate(date);
                  return (
                    <button
                      key={date}
                      onClick={() => {
                        setSelectedDate(date);
                        setSelectedTime('');
                      }}
                      className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
                        selectedDate === date
                          ? 'bg-[#FDD835] text-black shadow-md'
                          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      {formatted.short}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Time */}
            {selectedDate && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Choose time</h2>
                <div className="flex flex-wrap gap-3">
                  {times.map((slot) => {
                    const isSoldOut = slot.availableSpots === 0;
                    const spotsLeft = slot.availableSpots;
                    
                    return (
                      <button
                        key={`${slot.date}-${slot.time}`}
                        onClick={() => !isSoldOut && setSelectedTime(slot.time)}
                        disabled={isSoldOut}
                        className={`px-5 py-2.5 rounded-xl font-semibold transition-all relative ${
                          selectedTime === slot.time
                            ? 'bg-[#FDD835] text-black shadow-md'
                            : isSoldOut
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200'
                            : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:shadow-sm'
                        }`}
                      >
                        <span className="text-sm">{slot.time}</span>
                        {!isSoldOut && (
                          <span className={`ml-2 text-xs font-medium ${
                            selectedTime === slot.time ? 'text-red-700' : 'text-red-600'
                          }`}>
                            {spotsLeft} left
                          </span>
                        )}
                        {isSoldOut && (
                          <span className="ml-2 text-xs font-medium">sold out</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  All times are in IST (GMT +5:30)
                </p>
              </div>
            )}

            {/* About */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 text-base leading-relaxed">
                {experience.highlights.join('. ')}
              </p>
            </div>
          </div>

          {/* Right Sidebar - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-7 shadow-lg sticky top-24 border border-gray-100">
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Starts at</span>
                  <span className="font-bold text-xl text-gray-900">₹{selectedSlot?.price || experience.basePrice}</span>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Quantity</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                      className="w-9 h-9 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-lg"
                    >
                      −
                    </button>
                    <span className="font-bold text-lg w-6 text-center">{numberOfPeople}</span>
                    <button
                      onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                      className="w-9 h-9 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Subtotal</span>
                  <span className="font-semibold text-base text-gray-900">₹{basePrice}</span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b-2 border-gray-200">
                  <span className="text-sm font-medium text-gray-600">Taxes</span>
                  <span className="font-semibold text-base text-gray-900">₹{taxes}</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">₹{total}</span>
                </div>

                <button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-[#FDD835] hover:bg-[#FBC02D] disabled:bg-gray-300 disabled:cursor-not-allowed text-black font-bold py-3.5 rounded-xl transition-all hover:shadow-lg mt-6 text-base"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
