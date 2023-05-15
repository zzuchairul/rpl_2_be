import { Router } from 'express';
import UserRoutes from './user/user.routes'
import AdminRoutes from './admin/admin.routes'

const router = Router();

router.use('/user', UserRoutes);
router.use('/admin', AdminRoutes);

export default router;