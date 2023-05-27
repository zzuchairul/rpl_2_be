import { Router } from "express";

import AuthRoutes from './auth/auth.routes'
import ItemRoutes from './item/item.routes'
import OrderRoutes from './order/order.routes'
import { verifyToken } from "../../middleware";

const router = Router();

router.use('/auth', AuthRoutes);
router.use(verifyToken());
router.use('/item', ItemRoutes);
router.use('/order', OrderRoutes);

export default router;