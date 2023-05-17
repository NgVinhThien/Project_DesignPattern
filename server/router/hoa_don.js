import express from 'express';
import {getAllHD,insertHoaDon} from '../controller/hoa_don.js'
const router= express.Router();

router.get('/hoadon', getAllHD);
router.post('/themhoadon',insertHoaDon);

export default router;