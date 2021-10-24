// mongoose connection
let mongoose = require('mongoose');

// create a model class
let contactModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    emailAdd: String
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', contactModel);


//# sourceMappingURL=contact.js.map
