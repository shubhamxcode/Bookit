export interface Experience {
  _id: string;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  category: string;
  duration: string;
  imageUrl: string;
  images: string[];
  rating: number;
  reviewCount: number;
  basePrice: number;
  slots: Slot[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  meetingPoint: string;
}

export interface Slot {
  _id?: string;
  date: string;
  time: string;
  availableSpots: number;
  totalSpots: number;
  price: number;
}

export interface BookingRequest {
  experienceId: string;
  slotDate: string;
  slotTime: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfPeople: number;
  promoCode?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  booking: {
    bookingReference: string;
    experienceTitle: string;
    slotDate: string;
    slotTime: string;
    numberOfPeople: number;
    totalPrice: number;
    customerName: string;
    customerEmail: string;
  };
}

export interface PromoValidation {
  valid: boolean;
  discount: number;
  message: string;
}

