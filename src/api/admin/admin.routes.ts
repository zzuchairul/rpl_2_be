import { Router } from "express";

import AuthRoutes from './auth/auth.routes';
import ItemRoutes from './item/item.routes';

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/item', ItemRoutes);

export default router;