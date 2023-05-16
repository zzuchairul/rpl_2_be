import { NextFunction, Response, Router } from "express";

import database from '../../../db';
import tableNames from '../../../constant/tableNames';

const router = Router();

router.post('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    const {
      item_id, // array
      note,
    } = req.body;

    const order_id = await database(tableNames.order).insert({
      note,
      costumer_id: req.costumer.user.id,
    });

    const item_order = [];
    for (let i = 0; i < item_id.length; i++) {
      const item_order_id = await database(tableNames.item_order).insert({
        'item_id': item_id[i],
        order_id
      });
      item_order.push(item_order_id);
    }
    return res.status(201).json({
      status: 'OK'
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;