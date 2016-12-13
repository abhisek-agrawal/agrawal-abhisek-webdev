module.exports = function () {

    var mongoose = require('mongoose');

    var FollowSchema = mongoose.Schema({
        _donor: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        _recipient: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "follow"});

    return FollowSchema;
};