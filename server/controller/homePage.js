import { DanhMucProxy, DanhMucAdapter } from '../model/danhmuc.js';
import xe from "../model/xe.js";
import {Xe} from "../model/builderPattern.js"
import { HangXeProxy, HangXeAdapter} from '../model/hangxe.js';
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
      return res.render('detailsXe.ejs', {detailsXe: result});
    })
}
export const updateXe= async(req, res)=>{
  const queryUuDai = queryData('uudai');
  const dataUD = await queryUuDai.getData();

  const id_xe= req.params.id_xe;
  const xe= new Xe().setId(id_xe);
  xe.getDetails((result)=>{
    res.render('updateXe.ejs', {detailsXe: result, dataUD: dataUD});
  })
  
}
export const handleUpdateXe= async(req, res)=>{
  let gia_uu_dai= req.body.gia_ban - getPrice(req.body.gia_ban, req.body.loai_uu_dai)
  console.log(">>>Check update", req.body.id_xe)
  const xe= new Xe()
  .setId(req.body.id_xe)
  .setTenXe(req.body.ten_xe)
  .setGia(req.body.gia_ban)
  .setMota(req.body.mo_ta)
  .setLoaiUuDai(req.body.loai_uu_dai)
  .setGiaUuDai(gia_uu_dai)
  xe.updateXe((result)=>{
    const affectRow= result.affectedRows;
        if (affectRow>=1) {
          return res.redirect('/web/home')
        } else {
          res.send("Cập nhật thông tin không thành công");
        }
  })
  
}
export const deleteXe= async(req, res)=>{
  let id_xe= req.params.id_xe;
  const xe= new Xe()
  .setId(id_xe)
  xe.deleteImg((result)=>{
    const affectRow= result.affectedRows;
    if (affectRow>=0) {
      xe.deleteXe((result)=>{
        const affectRow= result.affectedRows;
        if (affectRow>=1) {
          return res.redirect('/web/home')
        } else {
          res.send("Xóa thông tin không thành công");
        }
      })
    } else {
      res.send("Xóa ảnh không thành công");
    }
  })
}
export const addXe= async(req, res)=>{

  if (req.fileValidationError) {
    return res.send(req.fileValidationError);
  }
  else if (!req.file) {
      return res.send('Please select an image to upload');
  }
  else if (req.file instanceof multer.MulterError) {
      return res.send(err);
  }
  let pathImg= "/image/" + req.file.filename;
  
  let gia_uu_dai= req.body.gia_ban - getPrice(req.body.gia_ban, req.body.loai_uu_dai)
  const xe= new Xe()
  .setTenXe(req.body.ten_xe)
  .setGia(req.body.gia_ban)
  .setIdHangXe(req.body.id_hang_xe)
  .setIdDanhMucXe(req.body.id_danh_muc_xe)
  .setMota(req.body.mo_ta)
  .setLoaiUuDai(req.body.loai_uu_dai)
  .setGiaUuDai(gia_uu_dai)

  xe.add((result)=>{
    const affectRow= result.affectedRows;
    const id_new= result.insertId;
    if (affectRow>=1) {
      xe.setId(id_new)
      xe.addImg(pathImg, (result)=>{
        const affectRow= result.affectedRows;
        if (affectRow>=1) {
          return res.redirect('/web/home')
        } else {
          res.send("Thêm ảnh không thành công");
        }
      })
    } else {
      res.send("Thêm thông tin không thành công");
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
const getAllHangXe = (req, res, data) => {
  res.render('dsHangxe.ejs', data);
};
const decoratedGetAllIdHangXe = decorator1(getAllIdHangXe);
const decoratedGetAllHangXe = decorator1(getAllHangXe);
export { decoratedGetAllIdHangXe as getAllIdHangXe };
export { decoratedGetAllHangXe as getAllHangXe };

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
const addHangXe = (req, res) => {
  const hangXeData = {
    ten_hang_xe: req.body.ten_hang_xe,
    logo: req.file.path,
  };

  const hangXeAdapter = new HangXeAdapter();
  hangXeAdapter.addHangXe(hangXeData, (err, hangXe) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi thêm hãng xe.');
    } else {
      res.redirect('/web/hangxe');
    }
  });
};

export { addHangXe };

const deleteHangXe = (req, res) => {
  const hangXeId = req.params.id;

  const hangXeAdapter = new HangXeAdapter();
  hangXeAdapter.deleteHangXe(hangXeId, (err, isDeleted) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi xoá hãng xe.');
    } else {
      if (isDeleted) {
        res.redirect('/web/hangxe');
      } else {
        res.status(404).send('Không tìm thấy hãng xe.');
      }
    }
  });
};
export { deleteHangXe };


