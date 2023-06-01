import express from "express";
import { getHomepage, getDetailXe, getAllIdDanhMuc, getAllIdHangXe ,addDanhMuc, getAlldanhmuc, deleteDanhMuc} from "../controller/homePage.js";
const router= express.Router();

router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
router.get('/web/danhmuc/:id',getAllIdDanhMuc);
router.get('/web/danhmuc',getAlldanhmuc);
router.get('/web/hangxe/:id',getAllIdHangXe);
router.post('/web/danhmuc/add', addDanhMuc);
router.get('/web/danhmuc/xoa/:id', deleteDanhMuc);
export default router;