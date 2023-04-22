import express from 'express';
import {getXe} from '../controller/xe.js'
const router= express.Router();

router.get('/xe', getXe);

export default router;