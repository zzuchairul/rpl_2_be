import { NextFunction, Request, Response, Router } from 'express';
import { sign, verify } from 'jsonwebtoken';
import database from '../../../db';
import tableNames from '../../../constant/tableNames';
require('dotenv').config();

const router = Router();

router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      username,
      password
    } = req.body;

    const user = await database(tableNames.user).where({ username }).select('*').first();

    if (!user || password !== user.password) {
      return res.status(404).json({
        status: 'FAIL',
        message: 'Failed to Login'
      });
    }

    delete user.password;

    const payload = {
      user,
      creted_at: Date.now()
    };

    const token = sign(
      payload,
      process.env.JWT_SECRET as string,
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      token,
      type: 'Bearer'
    });
  } catch (error) {
    return res.status(404).json(error);
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