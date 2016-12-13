module.exports = function () {

    var mongoose = require('mongoose');

    var PeopleSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        institution: String,
        password: String,
        email: String,
        phone: String,
        city: String,
        bloodType: String,
        profileImage: String,
        introduction: String,
        birthDate: String,
        type: {type: String, enum: ['Donor', 'Recipient']},
        follows: [{type: mongoose.Schema.Types.ObjectId, ref:'FollowModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "people"});

    return PeopleSchema;
};