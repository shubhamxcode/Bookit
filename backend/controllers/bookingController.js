import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

// Generate unique booking reference
const generateBookingReference = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `BK${timestamp}${randomStr}`.toUpperCase();
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const {
      experienceId,
      slotDate,
      slotTime,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      promoCode
    } = req.body;

    // Validate required fields
    if (!experienceId || !slotDate || !slotTime || !customerName || !customerEmail || !customerPhone || !numberOfPeople) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find experience
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Find the slot
    const slot = experience.slots.find(
      s => s.date === slotDate && s.time === slotTime
    );

    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    // Check availability
    if (slot.availableSpots < numberOfPeople) {
      return res.status(400).json({ 
        message: 'Not enough spots available',
        availableSpots: slot.availableSpots
      });
    }

    // Calculate price
    let basePrice = slot.price * numberOfPeople;
    let discount = 0;

    if (promoCode) {
      const promoResult = validatePromoCode(promoCode, basePrice);
      if (promoResult.valid) {
        discount = promoResult.discount;
      }
    }

    const totalPrice = basePrice - discount;

    // Update available spots
    slot.availableSpots -= numberOfPeople;
    await experience.save();

    // Create booking
    const booking = new Booking({
      experienceId,
      experienceTitle: experience.title,
      slotDate,
      slotTime,
      customerName,
      customerEmail,
      customerPhone,
      numberOfPeople,
      basePrice,
      promoCode: promoCode || '',
      discount,
      totalPrice,
      bookingReference: generateBookingReference()
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully',
      booking: {
        bookingReference: booking.bookingReference,
        experienceTitle: booking.experienceTitle,
        slotDate: booking.slotDate,
        slotTime: booking.slotTime,
        numberOfPeople: booking.numberOfPeople,
        totalPrice: booking.totalPrice,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get booking by reference
export const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingReference: req.params.reference });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Helper function to validate promo code
const validatePromoCode = (code, basePrice) => {
  const promoCodes = {
    'SAVE10': { type: 'percentage', value: 10, minAmount: 0 },
    'FLAT100': { type: 'flat', value: 100, minAmount: 500 },
    'WELCOME20': { type: 'percentage', value: 20, minAmount: 1000 },
    'SUMMER25': { type: 'percentage', value: 25, minAmount: 1500 }
  };

  const promo = promoCodes[code.toUpperCase()];
  
  if (!promo) {
    return { valid: false, discount: 0, message: 'Invalid promo code' };
  }

  if (basePrice < promo.minAmount) {
    return { 
      valid: false, 
      discount: 0, 
      message: `Minimum amount of ₹${promo.minAmount} required for this promo code` 
    };
  }

  let discount = 0;
  if (promo.type === 'percentage') {
    discount = Math.round((basePrice * promo.value) / 100);
  } else {
    discount = promo.value;
  }

  return { 
    valid: true, 
    discount, 
    message: `Promo code applied successfully! You saved ₹${discount}` 
  };
};

// Validate promo code endpoint
export const validatePromo = async (req, res) => {
  try {
    const { code, amount } = req.body;

    if (!code || !amount) {
      return res.status(400).json({ message: 'Promo code and amount are required' });
    }

    const result = validatePromoCode(code, amount);
    
    if (result.valid) {
      res.json({
        valid: true,
        discount: result.discount,
        message: result.message
      });
    } else {
      res.status(400).json({
        valid: false,
        discount: 0,
        message: result.message
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

