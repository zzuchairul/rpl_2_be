import { NextFunction, Request, Response, Router } from "express";

import database from '../../../db';
import tableNames from "../../../constant/tableNames";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await database(tableNames.order).select('*');
    return res.status(200).json(order);
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