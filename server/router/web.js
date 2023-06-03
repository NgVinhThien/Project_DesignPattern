import express from "express";
import multer from 'multer';
import path from 'path';
import { getHomepage, getDetailXe, getAllIdDanhMuc, getAllIdHangXe ,addDanhMuc, getAlldanhmuc, deleteDanhMuc, uploadImg, addXe} from "../controller/homePage.js";
const router= express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../server/public/image/");
    },
    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|bmp)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
let upload = multer({ storage: storage, fileFilter: imageFilter});
router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
router.get('/web/danhmuc/:id',getAllIdDanhMuc);
router.get('/web/danhmuc',getAlldanhmuc);
router.get('/web/hangxe/:id',getAllIdHangXe);
router.post('/web/xe/add', addXe);
router.post('/web/danhmuc/add', addDanhMuc);
router.post('/web/uploadImg', upload.single("img_xe"),uploadImg);
router.get('/web/danhmuc/xoa/:id', deleteDanhMuc);
export default router;