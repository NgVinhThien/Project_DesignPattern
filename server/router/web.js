import express from "express";
import multer from 'multer';
import path from 'path';
import { getHomepage, getDetailXe, getAllIdDanhMuc, getAllIdHangXe ,addDanhMuc, getAlldanhmuc, deleteDanhMuc, uploadImg, addXe, getAllHangXe, addHangXe, deleteHangXe} from "../controller/homePage.js";
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
let upload = multer({ storage: storage, fileFilter: imageFilter });


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join('uploads')); 
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload1 = multer({ storage: storage1 });
  
router.post('/web/danhmuc/add', upload1.single('anh_dai_dien'), addDanhMuc);
router.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
router.post('/web/hangxe/add', upload1.single('logo'), addHangXe);
router.get('/web/home', getHomepage);
router.get('/web/details/xe/:id_xe', getDetailXe);
router.get('/web/danhmuc/:id',getAllIdDanhMuc);
router.get('/web/danhmuc',getAlldanhmuc);
router.get('/web/hangxe',getAllHangXe);
router.get('/web/hangxe/:id',getAllIdHangXe);
router.post('/web/xe/add', addXe);
router.post('/web/danhmuc/add', addDanhMuc);
router.post('/web/uploadImg', upload.single('img_xe'),uploadImg);
router.get('/web/danhmuc/xoa/:id', deleteDanhMuc);
router.get('/web/hangxe/xoa/:id', deleteHangXe);
export default router;