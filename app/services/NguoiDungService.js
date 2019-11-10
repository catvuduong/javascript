function NguoiDungService() {
  this.layDanhSachNguoiDung = function () {
    return axios({
      method: "GET",
      url: "http://5dbacb9f3ec5fb00143193f8.mockapi.io/api/NguoiDung"
    });
  };
  this.themNguoiDung = function (nguoiDung) {
    return axios({
      method: "POST",
      url: "http://5dbacb9f3ec5fb00143193f8.mockapi.io/api/NguoiDung",
      data: nguoiDung,
    });
  };
  this.xoaNguoiDung = function (id) {
    return axios({
      method: "DELETE",
      url: `http://5dbacb9f3ec5fb00143193f8.mockapi.io/api/NguoiDung/${id}`
    });
  };
  this.layThongTinNguoiDung = function (id) {
    return axios({
      method: "GET",
      url: `http://5dbacb9f3ec5fb00143193f8.mockapi.io/api/NguoiDung/${id}`
    });
  };
}