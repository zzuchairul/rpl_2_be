import { NextFunction, Request, Response, Router } from "express";

import database from '../../../db';
import tableNames from "../../../constant/tableNames";
import { subDays, subMonths, subWeeks, subYears } from 'date-fns';

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { startDate, endDate } = req.query;

    const orders = await database('order')
      .whereRaw('DATE(order.create_at) >= ?', [startDate])
      .whereRaw('DATE(order.create_at) <= ?', [endDate])
      .join('item_order', 'order.id', 'item_order.order_id')
      .join('item', 'item_order.item_id', 'item.id')
      .join('costumer', 'costumer.id', '=', 'order.costumer_id')
      .select(
        'order.id as order_id',
        'order.create_at',
        'order.note',
        'order.costumer_id',
        'order.status',
        'item.id as item_id',
        'item.title',
        'item.price',
        'item.desc',
        'item.category',
        'item_order.qty',
        'costumer.table AS costumerTable',
      )

    const data = [];

    for (let i = 0; i < orders.length; i++) {
      let order_id = orders[i].order_id;

      const found = data.some(el => el.order_id === order_id)

      if (!found) {
        data.push({
          order_id: orders[i].order_id,
          create_at: orders[i].create_at,
          note: orders[i].note,
          costumer_id: orders[i].costumer_id,
          costumerTable: orders[i].costumerTable,
          status: orders[i].status,
          items: [
            {
              id: orders[i].item_id,
              title: orders[i].title,
              price: orders[i].price,
              qty: orders[i].qty
            }
          ],
        });
      } else {
        let index = data.findIndex(x => x.order_id === order_id)
        data[index].items.push({
          id: orders[i].item_id,
          title: orders[i].title,
          price: orders[i].price,
          qty: orders[i].qty
        })
      }
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/done/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order = await database(tableNames.order).where('id', id)
      .update({
        status: 'selesai'
      });

    if (!order) {
      return res.status(400).json({
        status: 'FAIL',
        message: 'no data'
      });
    }

    return res.status(201).json({
      status: 'OK'
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;