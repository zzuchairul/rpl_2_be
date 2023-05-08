import { Router } from 'express';
import UserRoutes from './user/user.routes'

const router = Router();

router.use('/user', UserRoutes);

export default router;