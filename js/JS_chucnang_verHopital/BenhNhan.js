//khai báo lớp đối tượng bẹnh nhân

function BenhNhan(stt, hoTen, gioiTinh, pk, nhietDo, nhipTim, oxy){
    //thuộc tính
    this.soThuTu = stt;
    this.hoTenBN = hoTen;
    this.gioiTinh = gioiTinh;
    this.phongKham = pk;
    this.nhietDo = nhietDo; 
    this.nhipTim = nhipTim; 
    this.oxy = oxy;
    
    //
    // this.tuChonPhongKham = function(){
    //     if(this.nhietDo >= 48 && this.nhipTim >= 90 && this.oxy < 95){
    //         this.phongKham = "PK nhiệt đới";
    //     }
    // }
}