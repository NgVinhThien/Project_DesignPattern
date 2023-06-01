import express from "express";
import { getHomepage, getDetailXe, getAllIdDanhMuc, getAllIdHangXe ,addDanhMuc, addXe} from "../controller/homePage.js";
const router= express.Router();

router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
router.get('/web/danhmuc/:id',getAllIdDanhMuc);
router.get('/web/hangxe/:id',getAllIdHangXe);
router.post('/web/danhmuc/add', addDanhMuc);
router.post('/web/xe/add', addXe)
export default router;