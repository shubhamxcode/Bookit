import { useLocation, useNavigate } from 'react-router-dom';

interface BookingInfo {
  bookingReference: string;
  experienceTitle: string;
  slotDate: string;
  slotTime: string;
  numberOfPeople: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
}

interface LocationState {
  success: boolean;
  booking?: BookingInfo;
  message?: string;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { success, booking, message } = (location.state as LocationState) || { success: false };

  if (!success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-4">
              <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Failed</h2>
            <p className="text-gray-600">
              {message || 'Unfortunately, your booking could not be completed.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking information found</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#FDD835] text-black px-6 py-2 rounded-lg hover:bg-[#FBC02D]"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="text-center max-w-lg w-full">
        {/* Success Icon */}
        <div className="mb-10">
          <div className="mx-auto flex items-center justify-center h-28 w-28 rounded-full bg-green-500 mb-8 shadow-lg">
            <svg className="h-16 w-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Ref ID: <span className="font-bold text-gray-900">{booking.bookingReference}</span>
          </p>

          <button
            onClick={() => navigate('/')}
            className="bg-gray-200 text-gray-700 px-10 py-3.5 rounded-xl font-semibold hover:bg-gray-300 transition-all hover:shadow-md"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
