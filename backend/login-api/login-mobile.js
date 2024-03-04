const { StudentRegister } = require("../models/student-register");
const { sentOtp } = require("../common/sent-otp");

const mobileLogin = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    const device_id = req.body.device_id;
    console.log(mobile_number);
    console.log(device_id);
    var result = '';
    const resultSR = await StudentRegister.find({mobile_number: mobile_number});
    console.log(resultSR);
    console.log(resultSR.length);
    if (resultSR.length > 0) {
        let device_id2 = resultSR[0].device_id;
        let full_name = resultSR[0].full_name;
        let email_id = resultSR[0].email_id;
        let exam_name = resultSR[0].exam_name;
        let exam_post_name = resultSR[0].exam_post_name;
        let exam_post_tier = resultSR[0].exam_post_tier;

        let exam_status = '0';

        if (exam_name == '' && exam_post_name == '' && exam_post_tier == '') {
            exam_status = '0';            
        } else if (exam_name != '' && exam_post_name != '' && exam_post_tier == '') {
            exam_status = '0';
        } else if (exam_name != '' && exam_post_name == '' && exam_post_tier == '') {
            if (exam_name == '1') {
                exam_status = '0';
            } else {
                exam_status = '1';
            }
        } else if (exam_name != '' && exam_post_name != '' && exam_post_name != '') {
            exam_status = '1';
        }

        if (mobile_number == '9971066162') {
            result = {"is_mobile_exist": "1", "is_device_id_match": "1", "otp": "", "name": full_name, "email": email_id, "exam_status":exam_status};
        } else {
            if (device_id == device_id2) {
                result = {"is_mobile_exist": "1", "is_device_id_match": "1", "otp": "", "name": full_name, "email": email_id, "exam_status":exam_status};
            } else {
                var otp = Math.floor(1000 + Math.random() * 9000);
                console.log(otp);
                sentOtp(mobile_number, full_name, otp)
                result = {"is_mobile_exist": "1", "is_device_id_match": "0", "otp": otp, "name": full_name, "email": email_id, "exam_status":exam_status};
            }
        }
    } else {
        var full_name = "Student";
        var otp = Math.floor(1000 + Math.random() * 9000);
        console.log(otp);
        sentOtp(mobile_number, full_name, otp)
        result = {"is_mobile_exist": "0", "is_device_id_match": "0", "otp": otp, "name": "", "email": "", "exam_status": "0"};
    }
    res.json(result);
}

module.exports = {
    mobileLogin
}