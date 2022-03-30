import express, { Request, Response, NextFunction } from 'express';
import {
  getAll,
  getById,
  createData,
  updateData,
  deleteData,
} from '../controller/controller';
const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send(`
    <h1> Clinton Otse Express API </h1>
    <p> Use '/api' to navigate database </p>
  `);
});

router.get('/api', getAll);
router.get('/api/:id', getById);
router.post('/api', createData);
router.put('/api/:id', updateData);
router.delete('/api/:id', deleteData);

module.exports = router;
