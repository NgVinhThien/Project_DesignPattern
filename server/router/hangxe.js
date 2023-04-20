import express from 'express';
import {getHangXe} from '../controller/hangxe.js'
import {getIdHangXe} from '../controller/hangxe.js'
const router= express.Router();

router.get('/hangxe', getHangXe);
router.get('/hangxe/:id', getIdHangXe);

export default router;