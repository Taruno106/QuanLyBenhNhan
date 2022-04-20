/**
 * Thêm nhân viên 
 */

//biến toàn cục
var dsbn = new DanhSachBenhNhan();
var validation = new Validation();


//Hàm rút gọn cú pháp document.getElementById
function getELE(id) {
    //id: truyen vao string
    return document.getElementById(id);
}

function setLocalStorage() {
    //chuyển dsbn.mangBN tu kiểu mảng sang kiểu Json
    localStorage.setItem("DSBN", JSON.stringify(dsbn.mangBN));
}


//lấy data từ LocalStorage để đẩy lên UI
function getLocalStorage() {
    //getItem sẽ lấy dữ liệu lên là JSON => chuyển từ JSON sang kiểu mảng để hiển thị trên UI
    if (localStorage.getItem("DSBN") != null) {
        dsbn.mangBN = JSON.parse(localStorage.getItem("DSBN"));
        hienThiTable(dsbn.mangBN);
    }
}
getLocalStorage();


function hienThiTable(mang) {

    var content = "";

    mang.map(function (item, index) {
        content += `<tr>
        <td>${item.soThuTu}</td>
        <td>${item.hoTenBN}</td>
        <td>${item.gioiTinh}</td>
        <td>${item.phongKham}</td>
        <td>${item.nhietDo}</td>
        <td>${item.nhipTim}</td>
        <td>${item.oxy}</td>
        <td>
        <button class="btn btn-danger" onclick="xoaBN('${item.soThuTu}')" >Xóa</button>
        </td>
        <td> 
        <button id="btnXem" type="button" class="btn btn-primary" onclick="xemChiTiet('${item.soThuTu}')" data-toggle="modal" data-target="#myModal">Xem</button>
        </td>
        
        
        </tr>`
    });
    getELE("tableDanhSach").innerHTML = content;
}

function themBN() {
    var stt = getELE("tkbn").value;
    var hoTen = getELE("name").value;
    var gioiTinh = getELE("gioiTinh").value;
    var phongKham = getELE("phongKham").value;
    var nhietDo = getELE("nhietDo").value;
    var nhipTim = getELE("nhipTim").value;
    var oxy = getELE("oxy").value;
    //console.log(stt, hoTen, gioiTinh, phongKham, nhietDo, nhipTim, oxy);

    //validation
    var isValid = true;
    //kiểm tra Số thứ tự
    isValid &= validation.checkEmpty(stt, "tbTKBN", "Số thứ tự bn không được để trống") && validation.checkID(stt, "tbTKBN", "Số thứ tự bn bị trùng", dsbn.mangBN) && validation.checkNum(stt, "tbTKBN", "Số thứ tự phai la kí tự số");

    //kiểm tra tên
    isValid &= validation.checkEmpty(hoTen, "tbTen", "Tên BN không được để trống") && validation.checkName(hoTen, "tbTen", "Tên BN phai la kí tự chữ");
    //kiểm tra giới tính
    isValid &= validation.checkDropdown("gioiTinh", "tbGioiTinh", "Bạn chưa chọn giới tính");

    //kiểm tra phong kham
    isValid &= validation.checkDropdown("phongKham", "tbPhongKham", "Bạn chưa chọn Phòng khám");

    //kiểm tra Nhiệt độ
    isValid &= validation.checkEmpty(nhietDo, "tbNhietDo", "Nhiệt độ không được để trống") && validation.checkNum(nhietDo, "tbNhietDo", "Nhiệt độ  phai la kí tự số");


    //kiểm tra Nhịp tim
    isValid &= validation.checkEmpty(nhipTim, "tbNhipTim", "Nhịp tim không được để trống") && validation.checkNum(nhipTim, "tbNhipTim", "Nhịp tim phai la kí tự số");

    //kiểm tra Oxy
    isValid &= validation.checkEmpty(oxy, "tbOxy", "Oxy không được để trống") && validation.checkNum(oxy, "tbOxy", "Oxy phai la kí tự số");


    if (isValid) {
        //B2: lưu thông tin vào lớp bệnh nhân
        var bn = new BenhNhan(stt, hoTen, gioiTinh, phongKham, nhietDo, nhipTim, oxy);
        //bn.phongKham = bn.tuChonPhongKham();
        console.table(bn)

        //B3: Lưu sv vào danh sách bệnh nhân
        dsbn.themBenhNhan(bn);
        getELE("formQLBN").reset();
        //console.log("mangbn", dsbn.mangBN);

        //lưu mangBN xuống localStorage
        setLocalStorage();

        // B4: Hiển thị table
        hienThiTable(dsbn.mangBN);
    }
}


/**
 * xóa bệnh nhân
 * 
 */


function xoaBN(stt) {
    dsbn.xoaBenhNhan(stt);

    hienThiTable(dsbn.mangBN);
    setLocalStorage();
}


function xemChiTiet(stt) {
    var viTri = dsbn.timViTri(stt);//tìm ra vị trí của bn
    var bn = dsbn.mangBN[viTri];//truy xuất vị trí của bn đó trong mảng => ta tìm được ptu mangBN[viTri] và gắn cho biến bn
    getELE("tkbn").disabled = true;

    getELE("tkbn").value = bn.soThuTu;//truy xuất thuộc tính soThuTu của lớp bn 
    getELE("name").value = bn.hoTenBN;
    getELE("gioiTinh").value = bn.gioiTinh;
    getELE("phongKham").value = bn.phongKham;
    getELE("nhietDo").value = bn.nhietDo;
    getELE("nhipTim").value = bn.nhipTim;
    getELE("oxy").value = bn.oxy;
}

function capNhatBN() {

    //B1: lấy thông tin từ form
    var stt = getELE("tkbn").value;
    var hoTen = getELE("name").value;
    var gioiTinh = getELE("gioiTinh").value;
    var phongKham = getELE("phongKham").value;
    var nhietDo = getELE("nhietDo").value;
    var nhipTim = getELE("nhipTim").value;
    var oxy = getELE("oxy").value;
    //console.log(stt, hoTen, gioiTinh, phongKham, nhietDo, nhipTim, oxy);

    //validation
    var isValid = true;
    
    //kiểm tra tên
    isValid &= validation.checkEmpty(hoTen, "tbTen", "Tên BN không được để trống") && validation.checkName(hoTen, "tbTen", "Tên BN phai la kí tự chữ");
    //kiểm tra giới tính
    isValid &= validation.checkDropdown("gioiTinh", "tbGioiTinh", "Bạn chưa chọn giới tính");

    //kiểm tra phong kham
    isValid &= validation.checkDropdown("phongKham", "tbPhongKham", "Bạn chưa chọn Phòng khám");

    //kiểm tra Nhiệt độ
    isValid &= validation.checkEmpty(nhietDo, "tbNhietDo", "Nhiệt độ không được để trống") && validation.checkNum(nhietDo, "tbNhietDo", "Nhiệt độ  phai la kí tự số"); 

    //kiểm tra Nhịp tim
    isValid &= validation.checkEmpty(nhipTim, "tbNhipTim", "Nhịp tim không được để trống") && validation.checkNum(nhipTim, "tbNhipTim", "Nhịp tim phai la kí tự số");

    //kiểm tra Oxy
    isValid &= validation.checkEmpty(oxy, "tbOxy", "Oxy không được để trống") && validation.checkNum(oxy, "tbOxy", "Oxy phai la kí tự số");


    if (isValid) {
        //B2: lưu thông tin vào lớp bệnh nhân
        var bn = new BenhNhan(stt, hoTen, gioiTinh, phongKham, nhietDo, nhipTim, oxy);

        dsbn.capNhatBenhNhan(bn);
        setLocalStorage();
        hienThiTable(dsbn.mangBN);
    }
}



/**
 * Reset
 */
function resetForm() {
    getELE("formQLBN").reset();
    getELE("tkbn").disabled = false;
}

/**
 * Tìm kiếm theo loai
 * 
 */
function timKiemTheoLoai() {
    var tuKhoaTK = getELE("searchName").value;
    var mangKQ = dsbn.timKiem(tuKhoaTK);
    hienThiTable(mangKQ);
}
getELE("searchName").addEventListener("keyup", timKiemTheoLoai);






