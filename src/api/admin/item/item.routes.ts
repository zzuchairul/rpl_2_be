import tableNames from '../../../constant/tableNames';
import { NextFunction, Request, Response, Router } from 'express';
import database from '../../../db';
import { fail } from 'assert';
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
router.post('/', async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, price, desc, category } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const { image } = req.files;

    const extFile: string = '.' + image.mimetype.split('/')[1]
    const allowedExt = ['.jpg', '.png', 'jpeg'];

    if (!allowedExt.includes(extFile.toLowerCase())) {
      return res.status(422).json({
        status: 'FAIL',
        message: 'must be type of .png, .jpg, .jpeg'
      });
    }

    const fileName: string = String(title) + extFile;
    const uploadPath: string = __dirname + '../../../../../public/asset/image/menu';

    image.mv(uploadPath + '/' + fileName, async (err) => {
      if (err) return res.status(500).send(err);

      await database(tableNames.item)
        .insert({
          title,
          price,
          category,
          desc: desc ?? title,
          imageURL: fileName
        });
      return res.json({
        status: 'OK'
      });
    })
  } catch (error) {
    res.status(400).json(error);
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