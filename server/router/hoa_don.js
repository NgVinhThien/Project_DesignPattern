import express from 'express';
import {getAllHD} from '../controller/hoa_don.js'
const router= express.Router();

router.get('/hoadon', getAllHD);

export default router;