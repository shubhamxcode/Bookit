import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bookingService } from '../services/api';
import type { Experience, Slot } from '../types';

interface LocationState {
  experience: Experience;
  selectedSlot: Slot;
  numberOfPeople: number;
}

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedSlot, numberOfPeople } = (location.state as LocationState) || {};

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    promoCode: '',
    agreedToTerms: false,
  });

  const [promoStatus, setPromoStatus] = useState<{
    valid: boolean;
    discount: number;
    message: string;
  } | null>(null);

  const [isValidatingPromo, setIsValidatingPromo] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if no booking data
  if (!experience || !selectedSlot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No booking data found</p>
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

  const basePrice = selectedSlot.price * numberOfPeople;
  const discount = promoStatus?.valid ? promoStatus.discount : 0;
  const taxes = Math.round((basePrice - discount) * 0.05);
  const totalPrice = basePrice - discount + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleApplyPromo = async () => {
    if (!formData.promoCode.trim()) {
      setPromoStatus(null);
      return;
    }

    setIsValidatingPromo(true);
    try {
      const result = await bookingService.validatePromoCode(formData.promoCode, basePrice);
      setPromoStatus({
        valid: result.valid,
        discount: result.discount,
        message: result.message,
      });
    } catch (error: any) {
      setPromoStatus({
        valid: false,
        discount: 0,
        message: error.response?.data?.message || 'Invalid promo code',
      });
    } finally {
      setIsValidatingPromo(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.customerName.trim() || !formData.customerEmail.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (!formData.agreedToTerms) {
      alert('Please agree to the terms and safety policy');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingData = {
        experienceId: experience._id,
        slotDate: selectedSlot.date,
        slotTime: selectedSlot.time,
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim() || '0000000000',
        numberOfPeople,
        promoCode: formData.promoCode.trim() || undefined,
      };

      const response = await bookingService.createBooking(bookingData);

      navigate('/result', {
        state: {
          success: true,
          booking: response.booking,
        },
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      navigate('/result', {
        state: {
          success: false,
          message: error.response?.data?.message || 'Failed to complete booking. Please try again.',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    });
  };

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
          <span className="font-semibold text-base">Checkout</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2.5">Full name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2.5">Email</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  placeholder="Promo code"
                  className="flex-1 px-5 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                />
                <button
                  onClick={handleApplyPromo}
                  disabled={isValidatingPromo}
                  className="bg-black text-white px-8 py-3.5 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-all font-semibold text-sm hover:shadow-lg"
                >
                  {isValidatingPromo ? 'Checking...' : 'Apply'}
                </button>
              </div>

              {promoStatus && (
                <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${promoStatus.valid ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                  {promoStatus.message}
                </div>
              )}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange}
                  className="mt-0.5 w-5 h-5 accent-black cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  I agree to the terms and safety policy
                </span>
              </label>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-7 shadow-lg sticky top-24 border border-gray-100">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-start">
                  <span className="text-gray-600 font-medium">Experience</span>
                  <span className="font-semibold text-right text-gray-900 max-w-[180px]">{experience.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Date</span>
                  <span className="font-semibold text-gray-900">{formatDate(selectedSlot.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Time</span>
                  <span className="font-semibold text-gray-900">{selectedSlot.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Qty</span>
                  <span className="font-semibold text-gray-900">{numberOfPeople}</span>
                </div>
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{basePrice}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span className="font-medium">Discount</span>
                    <span className="font-semibold">-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between pb-4 border-b-2 border-gray-200">
                  <span className="text-gray-600 font-medium">Taxes</span>
                  <span className="font-semibold text-gray-900">₹{taxes}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">₹{totalPrice}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-[#FDD835] hover:bg-[#FBC02D] disabled:bg-gray-300 text-black font-bold py-4 rounded-xl mt-6 transition-all hover:shadow-lg text-base"
              >
                {isSubmitting ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
