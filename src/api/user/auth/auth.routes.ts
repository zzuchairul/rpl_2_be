import { NextFunction, Request, Response, Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
require('dotenv').config();

import database from '../../../db';
import tableNames from '../../../constant/tableNames';

const router = Router();

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      table,
    } = req.body;

    const costumer_id = await database(tableNames.costumer).insert({ table });
    const costumer = await database(tableNames.costumer).select('*').where('id', costumer_id[0]).first();

    const payload = {
      user: costumer,
    };

    const token = sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '30m' }
    );
    res.status(200).json({
      token,
      type: 'bearer'
    });
  } catch (error) {
    res.status(404).json(error);
  }
});

router.get('/me', (req: Request, res: Response, next: NextFunction) => {
  const bearedHeader = req.headers['authorization'];

  const bearer = bearedHeader!.split(' ');
  const token = bearer[1];

  const data = verify(
    token,
    process.env.JWT_SECRET as string
  );

  return res.status(200).json({ data });
});

export default router;