const mongoose = require('mongoose');

const RegisteredUserSchema = new mongoose.Schema({
  id: Number,
  email_id: String,
  paper_code: String,
  exam_mode_id: Number,
  test_series_id: Number,
}, {collection: 'registered_user', timestamps: true});

const RegisteredUser = mongoose.model('registered_user', RegisteredUserSchema);

module.exports = {
    RegisteredUser
};
