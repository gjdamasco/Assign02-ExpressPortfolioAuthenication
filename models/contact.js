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



/*  MY WORK
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;

// create a model class
let ContactSchema = new Schema({
    contactName: String,
    contactNumber: String,
    emailAdd: String
},
{
    collection: "contacts"
});

const Model = mongoose_1.default.model("Contact", ContactSchema);
exports.default = Model;
*/

/*  from online video
let mongoose = require('mongoose');
module.exports = mongoose.model('Contact', contactModel);
*/

/* FROM PROF
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ContactSchema = new Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String
}, {
    collection: "contacts"
});
const Model = mongoose_1.default.model("Contact", ContactSchema);
exports.default = Model;
//# sourceMappingURL=contact.js.map
*/