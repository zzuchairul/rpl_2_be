import { NextFunction, Request, Response, Router } from "express";

import database from '../../../db';
import tableNames from "../../../constant/tableNames";

const router = Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await database(tableNames.item)
      .select('*')
      .where('available', 1)
    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.get('/:id', async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await database(tableNames.item).where('id', Number(id)).select('*').first();

    if (!item) {
      res.status(404).json({
        status: 'FAIL',
        message: 'no data',
        item
      });
    }

    return res.status(200).json(item);
  } catch (error) {
    return res.status(400).json(error);
  }
});

export default router;