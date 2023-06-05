import tableNames from '../../../constant/tableNames';
import { NextFunction, Request, Response, Router } from 'express';
import database from '../../../db';
import { fail } from 'assert';
import * as path from 'path';
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

// Route add url '/' method: POST
router.post('/done/:id', async (req: any, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (req.files === null) {
      res.status(400).json({ msg: 'No File Uploaded' });
      return;
    }

    const name = req.body.title;
    const file: any | undefined = req.files?.file;
    const fileSize = file.data.length;
    const ext: string = path.extname(file.name);
    const fileName: string = file.md5 + ext;
    const { price, desc, type } = req.body;
    // const url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) {
      res.status(422).json({ msg: 'Invalid Images' });
      return;
    }
    if (fileSize > 5000000) {
      res.status(422).json({ msg: 'Image must be less than 5 MB' });
      return;
    }

    file.mv(`./public/images/${fileName}`, async (err: any) => {
      if (err) {
        res.status(500).json({ msg: err.message });
        return;
      }
      try {
        const newData = {
          name: name,
          price: price,
          desc: desc,
          type: type,
          image: fileName,
        };
        const item = await database(tableNames.item).insert(newData, '*');
        res.status(201).json({ msg: 'Item Created Successfully' });
      } catch (error) {
        res.status(400).json({ msg: error });
      }
    });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

router.post('/delete/:id', async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await database(tableNames.item).where('id', id).del().catch(fail);

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
    const { id } = req.params

    const data = await database(tableNames.item)
      .where('id', id)
      .update(req.body)

    if (!data) {
      return res.status(404).json({
        status: 'FAIL',
        message: 'no data'
      });
    }

    return res.status(200).json({
      status: 'OK'
    })
  } catch (error) {
    return res.status(400).json(error);
  }
})

export default router;