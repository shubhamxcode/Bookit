# BookIt: Experiences & Slots

A complete full-stack web application for booking travel experiences. Users can explore various experiences, check available slots, and complete bookings with real-time availability updates.

## 🚀 Tech Stack

### Frontend
- React 19 + TypeScript
- React Router DOM for routing
- TailwindCSS for styling
- Axios for API calls
- Vite as build tool

### Backend
- Node.js + Express
- MongoDB with Mongoose
- RESTful API architecture
- CORS enabled

## 📁 Project Structure

```
highway delote/
├── backend/               # Backend API server
│   ├── config/           # Database configuration
│   ├── models/           # Mongoose models
│   ├── controllers/      # Route controllers
│   ├── routes/           # API routes
│   ├── server.js         # Server entry point
│   ├── seedData.js       # Database seeding script
│   └── package.json      # Backend dependencies
│
└── booklt/               # Frontend React app
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── services/     # API service layer
    │   ├── types/        # TypeScript type definitions
    │   ├── App.tsx       # Main app component
    │   └── main.tsx      # App entry point
    └── package.json      # Frontend dependencies
```

## 🎯 Features

### User Features
- ✅ Browse experiences by category
- ✅ View detailed information about each experience
- ✅ Check real-time slot availability
- ✅ Select date, time, and number of people
- ✅ Apply promo codes for discounts
- ✅ Complete booking with form validation
- ✅ Receive booking confirmation with reference number
- ✅ Responsive design for mobile and desktop

### Backend Features
- ✅ RESTful API endpoints
- ✅ MongoDB database integration
- ✅ Real-time slot availability management
- ✅ Promo code validation
- ✅ Booking reference generation
- ✅ Prevent double-booking

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create .env file:**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

**MongoDB Options:**

**Option 1: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/bookit
```

**Option 2: MongoDB Atlas (Recommended)**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Replace `<password>` with your database password
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookit?retryWrites=true&w=majority
```

4. **Seed the database with sample data:**
```bash
node seedData.js
```

5. **Start the backend server:**
```bash
npm run dev
```

The backend server will run on http://localhost:5000

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd booklt
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will run on http://localhost:5173 (or another port if 5173 is busy)

## 🎮 Usage

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Browse available experiences
4. Click on an experience to view details
5. Select a date, time, and number of people
6. Proceed to checkout
7. Fill in your information
8. (Optional) Apply a promo code
9. Confirm booking
10. View your booking confirmation

## 💳 Available Promo Codes

- `SAVE10` - 10% off (no minimum)
- `FLAT100` - ₹100 off (minimum ₹500)
- `WELCOME20` - 20% off (minimum ₹1000)
- `SUMMER25` - 25% off (minimum ₹1500)

## 🔌 API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get single experience by ID

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:reference` - Get booking by reference number

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

## 📱 Pages

1. **Home Page** - Browse and filter experiences
2. **Details Page** - View experience details and select slots
3. **Checkout Page** - Enter booking information and apply promo codes
4. **Result Page** - View booking confirmation or error message

## 🎨 Sample Data

The application includes 6 pre-configured experiences:
1. Sunset Desert Safari Adventure (Dubai)
2. Scuba Diving Experience (Maldives)
3. Traditional Cooking Class (Tuscany)
4. Historic City Walking Tour (Prague)
5. Mountain Trekking and Photography (Swiss Alps)
6. Temple and Cultural Heritage Tour (Kyoto)

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with --watch flag for auto-reload
```

### Frontend Development
```bash
cd booklt
npm run dev  # Vite dev server with HMR
```

### Build for Production

**Frontend:**
```bash
cd booklt
npm run build
```

**Backend:**
```bash
cd backend
npm start
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure MongoDB is running (if using local MongoDB)
- Check your MongoDB connection string in `.env`
- Verify all dependencies are installed: `npm install`

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check the API_BASE_URL in `src/services/api.ts`
- Verify CORS is enabled in backend

### Database seeding fails
- Check MongoDB connection
- Ensure MongoDB user has write permissions
- Verify connection string format

## 📄 License

This project is created for educational/demonstration purposes.

## 👤 Author

Created as a full-stack development project showcase.

## 🙏 Acknowledgments

- Images from Unsplash (royalty-free)
- Icons from Heroicons
- Built with React, Node.js, and MongoDB

