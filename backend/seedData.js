import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from './models/Experience.js';

dotenv.config();

const experiences = [
  {
    title: "Sunset Desert Safari Adventure",
    description: "Experience the magic of the desert as the sun sets over the golden dunes. This thrilling adventure includes dune bashing, camel rides, and a traditional BBQ dinner under the stars. Watch mesmerizing cultural performances including belly dancing and Tanoura shows. Perfect for families and adventure seekers alike.",
    shortDescription: "Thrilling desert safari with dune bashing and traditional dinner",
    location: "Dubai, UAE",
    category: "adventure",
    duration: "6 hours",
    imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800"
    ],
    rating: 4.8,
    reviewCount: 324,
    basePrice: 1200,
    highlights: [
      "Dune bashing in 4x4 vehicles",
      "Camel riding experience",
      "Traditional BBQ dinner",
      "Live cultural performances",
      "Sunset photography opportunities"
    ],
    included: [
      "Hotel pickup and drop-off",
      "Professional safari guide",
      "BBQ dinner and refreshments",
      "Cultural entertainment",
      "Safety equipment"
    ],
    notIncluded: [
      "Personal expenses",
      "Alcoholic beverages",
      "Quad biking (optional extra)"
    ],
    meetingPoint: "Hotel lobby pickup",
    slots: [
      { date: "2025-11-01", time: "15:00", availableSpots: 12, totalSpots: 20, price: 1200 },
      { date: "2025-11-01", time: "16:00", availableSpots: 8, totalSpots: 20, price: 1200 },
      { date: "2025-11-02", time: "15:00", availableSpots: 15, totalSpots: 20, price: 1200 },
      { date: "2025-11-02", time: "16:00", availableSpots: 20, totalSpots: 20, price: 1200 },
      { date: "2025-11-03", time: "15:00", availableSpots: 10, totalSpots: 20, price: 1200 }
    ]
  },
  {
    title: "Scuba Diving Experience in Crystal Waters",
    description: "Dive into an underwater paradise and explore vibrant coral reefs teeming with marine life. This guided scuba diving experience is suitable for both beginners and certified divers. Professional instructors ensure your safety while you discover the beauty beneath the waves. All equipment included.",
    shortDescription: "Explore underwater world with professional diving instructors",
    location: "Maldives",
    category: "water-sports",
    duration: "4 hours",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ],
    rating: 4.9,
    reviewCount: 567,
    basePrice: 2500,
    highlights: [
      "Professional PADI certified instructors",
      "Explore coral reefs",
      "See tropical fish and marine life",
      "All equipment provided",
      "Underwater photography available"
    ],
    included: [
      "Full scuba equipment",
      "Professional instructor",
      "Boat transportation",
      "Safety briefing and training",
      "Refreshments"
    ],
    notIncluded: [
      "Underwater camera rental",
      "Hotel transfers",
      "Medical certificate (if required)"
    ],
    meetingPoint: "Marina Bay Dive Center",
    slots: [
      { date: "2025-11-01", time: "08:00", availableSpots: 6, totalSpots: 8, price: 2500 },
      { date: "2025-11-01", time: "13:00", availableSpots: 4, totalSpots: 8, price: 2500 },
      { date: "2025-11-02", time: "08:00", availableSpots: 8, totalSpots: 8, price: 2500 },
      { date: "2025-11-03", time: "08:00", availableSpots: 5, totalSpots: 8, price: 2500 },
      { date: "2025-11-03", time: "13:00", availableSpots: 7, totalSpots: 8, price: 2500 }
    ]
  },
  {
    title: "Traditional Cooking Class with Local Chef",
    description: "Immerse yourself in authentic culinary traditions with a hands-on cooking class led by an award-winning local chef. Learn to prepare traditional dishes using fresh, locally-sourced ingredients. Enjoy your creations with wine pairing in a beautiful setting. Take home recipes and cooking techniques.",
    shortDescription: "Learn authentic recipes from award-winning local chef",
    location: "Tuscany, Italy",
    category: "food",
    duration: "5 hours",
    imageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    images: [
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ],
    rating: 4.7,
    reviewCount: 189,
    basePrice: 1800,
    highlights: [
      "Hands-on cooking experience",
      "Learn traditional recipes",
      "Fresh local ingredients",
      "Wine pairing included",
      "Take home recipe booklet"
    ],
    included: [
      "All ingredients and equipment",
      "Professional chef instruction",
      "Wine pairing",
      "Full meal tasting",
      "Recipe booklet"
    ],
    notIncluded: [
      "Hotel transportation",
      "Additional beverages",
      "Gratuities"
    ],
    meetingPoint: "Bella Cucina Cooking School",
    slots: [
      { date: "2025-11-01", time: "10:00", availableSpots: 8, totalSpots: 12, price: 1800 },
      { date: "2025-11-02", time: "10:00", availableSpots: 12, totalSpots: 12, price: 1800 },
      { date: "2025-11-02", time: "15:00", availableSpots: 6, totalSpots: 12, price: 1800 },
      { date: "2025-11-03", time: "10:00", availableSpots: 9, totalSpots: 12, price: 1800 }
    ]
  },
  {
    title: "Historic City Walking Tour",
    description: "Step back in time on this comprehensive walking tour through ancient streets and historic landmarks. Expert local guides share fascinating stories and hidden secrets of the city's rich heritage. Visit iconic monuments, charming neighborhoods, and discover local artisan shops. Small group sizes ensure personalized attention.",
    shortDescription: "Explore historic landmarks with expert local guide",
    location: "Prague, Czech Republic",
    category: "city-tours",
    duration: "3 hours",
    imageUrl: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800",
    images: [
      "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800",
      "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800"
    ],
    rating: 4.6,
    reviewCount: 432,
    basePrice: 800,
    highlights: [
      "Small group size (max 12 people)",
      "Expert local guide",
      "Visit major landmarks",
      "Learn city history and culture",
      "Local artisan shop visits"
    ],
    included: [
      "Professional tour guide",
      "Headsets for clear audio",
      "Entrance to public areas",
      "Local snack tasting"
    ],
    notIncluded: [
      "Museum entrance fees",
      "Food and drinks",
      "Hotel pickup"
    ],
    meetingPoint: "Old Town Square - Astronomical Clock",
    slots: [
      { date: "2025-11-01", time: "09:00", availableSpots: 10, totalSpots: 12, price: 800 },
      { date: "2025-11-01", time: "14:00", availableSpots: 12, totalSpots: 12, price: 800 },
      { date: "2025-11-02", time: "09:00", availableSpots: 5, totalSpots: 12, price: 800 },
      { date: "2025-11-02", time: "14:00", availableSpots: 8, totalSpots: 12, price: 800 },
      { date: "2025-11-03", time: "09:00", availableSpots: 12, totalSpots: 12, price: 800 }
    ]
  },
  {
    title: "Mountain Trekking and Nature Photography",
    description: "Embark on a breathtaking journey through pristine mountain trails with stunning panoramic views. This guided trek is perfect for nature lovers and photography enthusiasts. Professional photography guide provides tips for capturing perfect landscape shots. Witness diverse flora and fauna in their natural habitat.",
    shortDescription: "Scenic mountain trek with professional photography guidance",
    location: "Swiss Alps, Switzerland",
    category: "nature",
    duration: "8 hours",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
    ],
    rating: 4.9,
    reviewCount: 276,
    basePrice: 2200,
    highlights: [
      "Guided mountain trekking",
      "Professional photography tips",
      "Stunning alpine views",
      "Wildlife spotting opportunities",
      "Packed lunch included"
    ],
    included: [
      "Professional guide",
      "Trekking equipment",
      "Packed lunch and snacks",
      "Photography guidance",
      "Transportation to trailhead"
    ],
    notIncluded: [
      "Personal camera equipment",
      "Travel insurance",
      "Hotel accommodation"
    ],
    meetingPoint: "Alpine Adventure Base Camp",
    slots: [
      { date: "2025-11-01", time: "06:00", availableSpots: 8, totalSpots: 10, price: 2200 },
      { date: "2025-11-02", time: "06:00", availableSpots: 10, totalSpots: 10, price: 2200 },
      { date: "2025-11-03", time: "06:00", availableSpots: 6, totalSpots: 10, price: 2200 }
    ]
  },
  {
    title: "Temple and Cultural Heritage Tour",
    description: "Discover the spiritual heart of ancient civilization on this immersive cultural tour. Visit magnificent temples, witness traditional ceremonies, and learn about religious practices and architectural marvels. Experience authentic cultural performances and interact with local monks. A journey through faith, art, and history.",
    shortDescription: "Explore ancient temples and experience spiritual traditions",
    location: "Kyoto, Japan",
    category: "cultural",
    duration: "6 hours",
    imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800",
    images: [
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"
    ],
    rating: 4.8,
    reviewCount: 398,
    basePrice: 1500,
    highlights: [
      "Visit 5 historic temples",
      "Traditional tea ceremony",
      "Cultural performance",
      "Expert guide on Buddhism and Shintoism",
      "Traditional lunch included"
    ],
    included: [
      "Temple entrance fees",
      "Professional cultural guide",
      "Traditional lunch",
      "Tea ceremony experience",
      "Transportation between sites"
    ],
    notIncluded: [
      "Hotel pickup",
      "Personal purchases",
      "Additional snacks"
    ],
    meetingPoint: "Kyoto Station Central Exit",
    slots: [
      { date: "2025-11-01", time: "08:30", availableSpots: 15, totalSpots: 20, price: 1500 },
      { date: "2025-11-01", time: "13:00", availableSpots: 12, totalSpots: 20, price: 1500 },
      { date: "2025-11-02", time: "08:30", availableSpots: 20, totalSpots: 20, price: 1500 },
      { date: "2025-11-03", time: "08:30", availableSpots: 18, totalSpots: 20, price: 1500 }
    ]
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing data
    await Experience.deleteMany({});
    console.log('Existing experiences cleared');

    // Insert new data
    await Experience.insertMany(experiences);
    console.log('Sample experiences added successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

