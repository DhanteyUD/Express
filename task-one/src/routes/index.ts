import express from 'express';
import {
  getAll,
  getById,
  createData,
  updateData,
  deleteData,
} from '../controller/controller';
import { indexController } from '../controller/index';
import { postValidator } from '../validator/postValidator';
const router = express.Router();

/* GET home page. */
router.get('/', indexController);

router.get('/api', getAll);
router.get('/api/:id', getById);
router.post('/api', postValidator, createData);
router.put('/api/:id', updateData);
router.delete('/api/:id', deleteData);

module.exports = router;
