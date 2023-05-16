import tableNames from '../../../constant/tableNames';
import { NextFunction, Request, Response, Router } from 'express';
import database from '../../../db';
require('dotenv').config();

const router = Router();

router.get('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    const item = await database(tableNames.item).select('*');
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
        message: 'no data'
      });
    }

    res.status(200).json(item);
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/delete/:id', async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await database(tableNames.item).where('id', id).del();

    if (!item) {
      return res.status(404).json({
        status: 'FAIL',
        message: 'no data'
      });
    }

    return res.status(200).json({
      status: 'OK'
    });
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post('/update/:id', async (req: any, res: Response, next: NextFunction) => {
  try {

  } catch (error) {
    return res.status(400).json(error);
  }
})

export default router;