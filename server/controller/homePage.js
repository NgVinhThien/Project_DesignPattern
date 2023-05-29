import { DanhMucProxy, DanhMucAdapter } from '../model/danhmuc.js';
import xe from "../model/xe.js";
import { HangXeProxy } from '../model/hangxe.js';
export const getHomepage = (req, res) => {
    let row;
    xe.getAll((result) => {
            const query= queryData(1);
            // console.log(query.getData());
            console.log(">>>Check Factory Pattern:", typeof(query.getData()));
            // xe.getAll((result)=>{
            //     row= result;
            //     // console.log("Check row: ", row);
            //     return res.render('homePage.ejs', {dataXe: row});
            });
};
export const getDetailXe= (req, res)=>{
    
    let id_xe= req.params.id_xe;
    // console.log(">>>Check request params", id_xe);
    xe.getDetailXeById(id_xe, (result)=> {
        // console.log(">>>Check details Xe", result);
        return res.render('detailsXe.ejs', {detailsXe: JSON.stringify(result)});
    })
   
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
  

  const decoratedGetAllIdDanhMuc = decorator(getAllIdDanhMuc);
  
 
  export { decoratedGetAllIdDanhMuc as getAllIdDanhMuc };
  


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
    anh_dai_dien: req.body.anh_dai_dien,
  };

  const danhMucAdapter = new DanhMucAdapter();
  danhMucAdapter.addDanhMuc(danhMucData, (err, danhMuc) => {
    if (err) {
      console.error(err);
      res.status(500).send('Lỗi khi thêm danh mục.');
    } else {
      res.redirect('/web/danhmuc/' + danhMuc.id);
    }
  });
};

export { addDanhMuc };


