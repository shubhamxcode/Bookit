# BookIt Backend API

Backend API server for BookIt - Experiences & Slots booking application.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

**For MongoDB Atlas:**
- Go to https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string
- Replace `<password>` and `<dbname>` in the connection string

**For Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/bookit
```

### 3. Seed Sample Data
```bash
npm run seed
```

### 4. Start the Server
```bash
npm run dev
```

The server will run on http://localhost:5000

## API Endpoints

### Experiences
- `GET /api/experiences` - Get all experiences
- `GET /api/experiences/:id` - Get single experience by ID

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:reference` - Get booking by reference

### Promo Codes
- `POST /api/promo/validate` - Validate promo code

## Available Promo Codes
- `SAVE10` - 10% off (no minimum)
- `FLAT100` - ₹100 off (min ₹500)
- `WELCOME20` - 20% off (min ₹1000)
- `SUMMER25` - 25% off (min ₹1500)

