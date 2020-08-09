import { Router } from 'express';
import UserRouter from './Users';
import BookRouter from './Books';
import Burrowouter from './Burrows';
import AuthRouter from './Auth';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/users', UserRouter);
router.use('/books', BookRouter);
router.use('/burrows', Burrowouter);
// router.use('/auth', AuthRouter);

// Export the base-router
export default router;
