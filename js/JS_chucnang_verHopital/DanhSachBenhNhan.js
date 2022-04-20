//khai báo lớp đối tượng DanhSachBenhNhan 

function DanhSachBenhNhan(){
    //thuộc tính
    this.mangBN = [];

    //phương thức
    this.themBenhNhan = function(bn){
        this.mangBN.push(bn);
    }

    this.timViTri = function(stt){
        var viTri = -1; 

        this.mangBN.map(function(item, index){
            if(item.soThuTu == stt){
                viTri = index;
            }
        })
        return viTri;
    }

    this.xoaBenhNhan = function(stt){
        var viTri = this.timViTri(stt); 
        if(viTri >= 0){
            this.mangBN.splice(viTri, 1);
        } else {
            console.log("Không tìm được");
        }
    }

    this.capNhatBenhNhan = function(bn){
        var viTri = this.timViTri(bn.soThuTu); 
        if(viTri >= 0){
            this.mangBN[viTri] = bn;
        } else {
            console.log("Không tìm được");
        }
    }
}

DanhSachBenhNhan.prototype.timKiem = function(tuKhoaTK){
    var mangKQ = [];
    //
    var lowerTK = tuKhoaTK.trim().toLowerCase();
    this.mangBN.map(function(item, index){
        var tenThuong = item.hoTenBN.trim().toLowerCase();
        var kq = tenThuong.indexOf(lowerTK); // tim` kiem cac ki tu trong  lowerTK tu trong tenThuong
        if(kq >= 0){
            mangKQ.push(item);
        }
    });
    return mangKQ;
}