const { sentOtp } = require("../common/sent-otp");

const loginWithMobile = async (req, res) => {
    const mobile_number = req.body.mobile_number;
    console.log(mobile_number);
    var otp = Math.floor(1000 + Math.random() * 9000);
    sentOtp(mobile_number, "Student", otp)
    var result = {"otp": otp};
    res.json(result);
} 

module.exports = {
    loginWithMobile
}