
var nguoiDungService = new NguoiDungService();
function github() {
  console.log("im the best");
};


function testing() {
  console.log("go ahead");
};

getListUser();


getEle("btnThemNguoiDung").addEventListener("click", function () {
  var title = "Thêm Người Dùng";
  var footer = `
    <button class="btn btn-success" onclick="themNguoiDung()">Thêm</button>
  `;

  document.getElementsByClassName("modal-title")[0].innerHTML = title;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  getEle("TaiKhoan").value = "";
  getEle("TaiKhoan").removeAttribute('disabled')
  getEle("HoTen").value = "";
  getEle("MatKhau").value = "";
  getEle("Email").value = "";
  getEle("SoDienThoai").value = "";
  getEle("loaiNguoiDung").value = "";
});



//Sua nguoi dung
function sua(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Sửa người dùng";

  var footer = `
    <button class="btn btn-success" onclick="capNhat(${id})">Cập nhật</button>
  `;

  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  nguoiDungService
    .layThongTinNguoiDung(id)
    .then(function (result) {
      getEle("TaiKhoan").setAttribute("disabled", true);
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("SoDienThoai").value = result.data.soDT;
      getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
    })
    .catch(function (err) {
      console.log(err);
    });
}


function themNguoiDung() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var soDT = getEle("SoDienThoai").value;
  var maLoaiNguoiDung = getEle("loaiNguoiDung").value;

  var nguoiDung = new NguoiDung(
    taiKhoan,
    matKhau,
    hoTen,
    email,
    soDT,
    maLoaiNguoiDung
  );

  nguoiDungService
    .themNguoiDung(nguoiDung)
    .then(function (result) {
      console.log(result);
      getListUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function getListUser() {
  nguoiDungService
    .layDanhSachNguoiDung()
    .then(function (result) {
      // setLocalStorage(result.data);
      renderTable(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function xoa(id) {
  nguoiDungService
    .xoaNguoiDung(id)
    .then(function (result) {
      console.log(result);
      getListUser();
    })
    .catch(function (error) {
      if (error.response.status === 404) {
        alert("Ma nguoi dung sai roi");
      }
    });
}


function getEle(id) {
  return document.getElementById(id);
}

function renderTable(mangNguoiDung) {
  var contentHTML = "";
  mangNguoiDung.map(function (item, index) {
    contentHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.soDT}</td>
                    <td>${item.maLoaiNguoiDung}</td>
                    <td>
                      <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="sua(${
      item.id
      })">Sửa</button>
                      <button class="btn btn-danger" onclick="xoa(${
      item.id
      })">Xóa</button>
                    </td>
                </tr>
            `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}