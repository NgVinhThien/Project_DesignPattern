import { DanhMucProxy, DanhMucAdapter } from '../model/danhmuc.js';
import xe from "../model/xe.js";
import {Xe} from "../model/builderPattern.js"
import { HangXeProxy } from '../model/hangxe.js';
import {queryData} from '../model/factoryPattern.js';
import multer from 'multer';
import getPrice from '../strategy_pattern/strategyPattern.js';

export const getHomepage = async (req, res) => {

  const queryXe=  queryData('xe');
  const dataXe= await queryXe.getData();

  const queryDanhMuc= queryData('danhmuc');
  const dataDM= await queryDanhMuc.getData();

  const queryHangXe= queryData('hangxe');
  const dataHX= await queryHangXe.getData();

  const queryUuDai = queryData('uudai');
  const dataUD = await queryUuDai.getData();

  return res.render('homePage.ejs', {dataXe: dataXe, dataDM: dataDM, dataHX: dataHX, dataUD: dataUD});
};
export const getDetailXe= (req, res)=>{
    
    let id_xe= req.params.id_xe;
    // console.log(">>>Check request params", id_xe);
    xe.getDetailXeById(id_xe, (result)=> {
        // console.log(">>>Check details Xe", result);
      return res.render('detailsXe.ejs', {detailsXe: JSON.stringify(result)});
    })
   
}
export const addXe= (req, res)=>{

  console.log(">>>Check post method",req.body);

  // const dataInsert= {
  //   ten_xe: req.body.ten_xe,
  //   gia: req.body.gia_ban,
  //   id_hang_xe: req.body.id_hang_xe,
  //   id_danh_muc_xe: req.body.id_danh_muc_xe,
  //   mota: req.body.mo_ta,
  //   loai_uu_dai: req.body.loai_uu_dai,
  //   gia_uu_dai: req.body.gia_ban - getPrice(req.body.gia_ban, req.body.loai_uu_dai)
  // }
  let gia_uu_dai= req.body.gia_ban - getPrice(req.body.gia_ban, req.body.loai_uu_dai)
  const xe= new Xe()
  .setTenXe(req.body.ten_xe)
  .setGia(req.body.gia_ban)
  .setIdHangXe(req.body.id_hang_xe)
  .setIdDanhMucXe(req.body.id_danh_muc_xe)
  .setLoaiUuDai(req.body.loai_uu_dai)
  .setGiaUuDai(gia_uu_dai)

  xe.add((result)=>{
    const affectRow= result.affectedRows;
    console.log(affectRow);
    if (affectRow>=1) {
      return res.redirect('/web/home')
    } else {
      res.send("Thêm không thành công");
    }

  })
}

export const uploadImg= async(req, res)=>{

  let upload = multer().single('img_xe');
  upload(req, res, (err)=>{
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }
    else if (err instanceof multer.MulterError) {
        return res.send(err);
    }
    let pathImg= "/image/" + req.file.filename;
    console.log(">>>check path imgae", pathImg);
    res.send(`You have uploaded this image: <hr/><img src="${pathImg}" width="500"><hr /><a href="./">Upload another image</a>`);
  });

  
}

const decorator = (originalFn) => {
  return (req, res) => {
    let id = req.params.id;
  
    DanhMucProxy.getAllIdDanhMuc(id, (result) => {
      let danhmucXe = result;
  
      DanhMucProxy.getAll((danhmucData) => {
        HangXeProxy.getAll((hangxeData) => {
          const data = {
            danhmucXe: danhmucXe,
            dataDanhmuc: danhmucData,
            dataHangxe: hangxeData
          };
  
  
          originalFn(req, res, data);
        });
      });
    });
  };
};


const getAllIdDanhMuc = (req, res, data) => {
  res.render('danhmucXe.ejs', data);
};
const getAlldanhmuc = (req, res, data) => {
  res.render('dsDanhmuc.ejs', data);
};

const decoratedGetAllIdDanhMuc = decorator(getAllIdDanhMuc);
const decoratedGetAllDanhMuc = decorator(getAlldanhmuc);

export { decoratedGetAllIdDanhMuc as getAllIdDanhMuc };
export { decoratedGetAllDanhMuc as getAlldanhmuc };


const decorator1 = (originalFn) => {
  return (req, res) => {
    let id = req.params.id;

    HangXeProxy.getAllIdHangXe(id, (result) => {
      let hangxe = result;

      DanhMucProxy.getAll((danhmucData) => {
        HangXeProxy.getAll((hangxeData) => {
          const data = {
            idHangXe: hangxe,
            dataDanhmuc: danhmucData,
            dataHangxe: hangxeData
          };

          originalFn(req, res, data);
        });
      });
    });
  };
};

const getAllIdHangXe = (req, res, data) => {
  res.render('hangXe.ejs', data);
};

const decoratedGetAllIdHangXe = decorator1(getAllIdHangXe);

export { decoratedGetAllIdHangXe as getAllIdHangXe };


const addDanhMuc = (req, res) => {
const danhMucData = {
  ten_danh_muc: req.body.ten_danh_muc,
  anh_dai_dien: req.file.path, 
};

const danhMucAdapter = new DanhMucAdapter();
danhMucAdapter.addDanhMuc(danhMucData, (err, danhMuc) => {
  if (err) {
    console.error(err);
    res.status(500).send('Lỗi khi thêm danh mục.');
  } else {
    res.redirect('/web/danhmuc');
  }
});
};

export { addDanhMuc };
const deleteDanhMuc = (req, res) => {
const danhMucId = req.params.id;

const danhMucAdapter = new DanhMucAdapter();
danhMucAdapter.deleteDanhMuc(danhMucId, (err, isDeleted) => {
  if (err) {
    console.error(err);
    res.status(500).send('Lỗi khi xoá danh mục.');
  } else {
    if (isDeleted) {
      res.redirect('/web/danhmuc');
    } else {
      res.status(404).send('Không tìm thấy danh mục.');
    }
  }
});
};

export { deleteDanhMuc };


