import express from 'express';
import { createBooking, getBookingByReference, validatePromo } from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/:reference', getBookingByReference);
router.post('/promo/validate', validatePromo);

export default router;

