const { mongoose } = require('mongoose');

const StudentRegisterSchema = new mongoose.Schema({
    device_id: String,
    email_id: String,
    exam_name: String,
    exam_post_name: String,
    exam_post_tier: String,
    full_name: String,
    id: String,
    mobile_number: String,
    otp: String,
    otp_status: String,
    password: String,
    register_type: String,
    residence_state: String,
    status: String,
    ts: { type: Date, default: Date.now },
    token: String,
    token_status: String,
    authenticationToken: String,
    goal: [{ type: String }],
    updated_ts: { type: Date, default: Date.now }
}, {collection: 'student_register', timestamps: true});

StudentRegisterSchema.methods.saveToken = function(AuthToken){
    // this.authenticationToken = crypto.createHash('sha256').update(AuthToken).digest('hex');
    this.authenticationToken = AuthToken;
}

const StudentRegister = mongoose.model('student_register', StudentRegisterSchema);

module.exports = { StudentRegister };