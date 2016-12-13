module.exports = function () {

    var mongoose = require('mongoose');

    var CommentSchema = mongoose.Schema({
        _post: {type: mongoose.Schema.Types.ObjectId, ref:'PostModel'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        comment: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "comment"});

    return CommentSchema;
};