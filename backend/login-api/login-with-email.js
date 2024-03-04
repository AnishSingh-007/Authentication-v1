const { StudentRegister } = require("../models/student-register");

const loginWithEmail = async (req, res) => {
    const email_id = req.body.email_id;
    console.log(email_id);
    var result = '';
    const resultSR = await StudentRegister.find({email_id: email_id});
    console.log(resultSR);
    console.log(resultSR.length);
    if (resultSR.length > 0) {
        let is_mobile_exist = false;
        let full_name = resultSR[0].full_name;
        let mobile_number = resultSR[0].mobile_number;
        if (mobile_number === '') {
            is_mobile_exist = false;
        } else {
            is_mobile_exist = true;
        }
        result = {"is_email_exist": "true", "name": full_name, "is_mobile_exist": is_mobile_exist, "mobile": mobile_number, "is_goal_set": "false"};
    } else {
        var full_name = "Student";
        result = {"is_email_exist": "false",  "name": full_name, "is_mobile_exist": "false", "mobile": "", "is_goal_set": "false"};
    }
    res.json(result);
} 

module.exports = {
    loginWithEmail
}