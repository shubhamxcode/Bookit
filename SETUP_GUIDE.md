# Quick Setup Guide - BookIt Application

Follow these steps to get the application running on your local machine.

## 🎯 Step-by-Step Setup

### Step 1: MongoDB Setup (Choose One Option)

#### Option A: Local MongoDB (Fastest for Development)
If you have MongoDB installed locally, the `.env` file is already configured for you!

#### Option B: MongoDB Atlas (Recommended for Production)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for a free account
3. Create a new cluster (M0 Sandbox - FREE)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Open `backend/.env` file and replace the MONGODB_URI:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/bookit?retryWrites=true&w=majority
```
7. Replace `username`, `password`, and cluster address with your actual values

### Step 2: Install Backend Dependencies

Open a terminal and run:
```bash
cd backend
npm install
```

### Step 3: Seed the Database

This will populate your database with sample experiences:
```bash
npm run seed
```

You should see:
```
MongoDB connected
Existing experiences cleared
Sample experiences added successfully
```

### Step 4: Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

### Step 5: Install Frontend Dependencies

Open a **NEW terminal** (keep backend running) and run:
```bash
cd booklt
npm install
```

### Step 6: Start Frontend Server

```bash
npm run dev
```

You should see something like:
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 7: Open the Application

Open your browser and go to: http://localhost:5173

## ✅ Verify Everything Works

1. You should see the home page with 6 experiences
2. Try filtering by category (Adventure, Cultural, etc.)
3. Click on an experience to view details
4. Select a date/time slot
5. Click "Proceed to Checkout"
6. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Phone: 1234567890
7. Try a promo code: `SAVE10`
8. Click "Confirm Booking"
9. You should see a success page with a booking reference!

## 🎁 Test Promo Codes

Try these promo codes during checkout:
- `SAVE10` - 10% discount on any amount
- `FLAT100` - ₹100 off on orders above ₹500
- `WELCOME20` - 20% off on orders above ₹1000
- `SUMMER25` - 25% off on orders above ₹1500

## ⚠️ Common Issues

### Issue: "Failed to load experiences"
**Solution:** Make sure the backend server is running on port 5000

### Issue: "Connection refused" or "Network Error"
**Solution:** 
1. Check if backend is running: http://localhost:5000/api/health
2. Should show: `{"status":"ok","message":"Server is running"}`

### Issue: Seed script fails
**Solution:** 
1. Check MongoDB connection in `.env`
2. Make sure MongoDB is running (if using local)
3. Check internet connection (if using Atlas)

### Issue: Port 5000 or 5173 already in use
**Solution:** 
- Kill the process using that port, or
- Change the port in `.env` (backend) or `vite.config.ts` (frontend)

## 📞 Need Help?

If you need the MongoDB connection string or have any questions, please let me know!

## 🎉 You're All Set!

Your full-stack booking application is now running. Enjoy exploring the features!

### What You Can Do Now:
- ✅ Browse experiences
- ✅ Check available slots
- ✅ Make bookings
- ✅ Apply discount codes
- ✅ View booking confirmations
- ✅ Test the entire booking flow

### Next Steps (Optional):
- Customize the UI/styling
- Add more experiences
- Create new promo codes
- Add user authentication
- Implement payment gateway
- Add email notifications

