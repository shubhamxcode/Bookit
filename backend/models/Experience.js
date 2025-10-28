import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  availableSpots: {
    type: Number,
    required: true,
    min: 0
  },
  totalSpots: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['adventure', 'cultural', 'food', 'nature', 'water-sports', 'city-tours']
  },
  duration: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  basePrice: {
    type: Number,
    required: true
  },
  slots: [slotSchema],
  highlights: [{
    type: String
  }],
  included: [{
    type: String
  }],
  notIncluded: [{
    type: String
  }],
  meetingPoint: {
    type: String
  }
}, {
  timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;

