const axios = require("axios");

const sentOtp = (mobile_number, full_name, otp) => {
    const dltid = '1307164724922866629';
	const authkey = '335005AJQpl1sUiBM5f5770e8P1';
    var otpUrl = `https://control.msg91.com/api/sendotp.php?authkey=${authkey}&mobile=${mobile_number}&message=Pinnacle coaching: Dear ${full_name}, This ${otp} for Pinnacle OTP verification.&sender=pinncs&otp=${otp}&DLT_TE_ID=${dltid}`;
    console.log(otpUrl);
    axios.post(otpUrl)
		.then(response => {
            console.log(response.data);
		})
		.catch((err) => {
            console.log(err);
		});
}

module.exports = {
    sentOtp
}