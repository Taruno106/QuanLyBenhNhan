//tạo lớp đối tượng Validation 

function Validation(){

    //Phương thức 
    //kiểm tra trống
    this.checkEmpty = function(inputVal,spanID,message){
        if(inputVal.trim() == ""){
            //không hợp lệ 
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }else{
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    //kiểm tra tài khoản trùng
    this.checkID = function(inputVal, spanID, message, mang){
        //kiểm tra tk đã tồn tại trong mảng
        var isExist = false;
        //some => return giá trị true/ false dựa vào biểu thức so sánh
        isExist = mang.some(function(item){
            
            return item.soThuTu == inputVal.trim();
        });
        if(isExist){
            //tk bị trùng => không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else{
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }
    }

    this.checkNum = function(inputVal,spanID,message){
        var pattern = /^[0-9]+$/;
        if(inputVal.match(pattern)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            //không hợp lệ 
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }
    }

    this.checkName = function(inputval,spanID,message){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if(pattern.test(inputval)){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            //không hợp lệ 
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }
    }

    this.checkDropdown = function(selID, spanID, message){
        var optIndex = document.getElementById(selID).selectedIndex;
        if(optIndex != 0){
            //hợp lệ
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            //không hợp lệ 
            document.getElementById(spanID).innerHTML = message;
            return false; 
        }
    }
}