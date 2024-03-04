const { mongoose } = require('mongoose');

const FooterSchema = new mongoose.Schema({
    terms_conditions: String
}, {collection: 'footer', timestamps: true});

const Footer = mongoose.model('footer', FooterSchema);

module.exports = {
    Footer
};