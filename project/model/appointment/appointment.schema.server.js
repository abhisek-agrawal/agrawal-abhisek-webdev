module.exports = function () {

    var mongoose = require('mongoose');

    var AppointmentSchema = mongoose.Schema({
        _donor: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        _recipient: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        date: String,
        time: String,
        status: {type: String, enum: ['Pending', 'Approved', 'Declined']},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "appointment"});

    return AppointmentSchema;
};