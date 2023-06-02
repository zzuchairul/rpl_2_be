import { NextFunction, Response, Router } from "express";

import database from '../../../db';
import tableNames from '../../../constant/tableNames';

const router = Router();

router.post('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    const {
      items_ids, // array
      note,
      items_qtys
    } = req.body;

    const order_id = await database(tableNames.order).insert({
      note,
      costumer_id: req.costumer.user.id,
    });

    const item_order = [];
    for (let i = 0; i < items_ids.length; i++) {
      const item_order_id = await database(tableNames.item_order).insert({
        'item_id': items_ids[i],
        order_id,
        'qty': items_qtys[i]
      });
      item_order.push(item_order_id);
    }
    return res.status(201).json({
      status: 'OK',
      orderId: order_id
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;