module.exports = function () {

    var mongoose = require('mongoose');

    var PostSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref:'PeopleModel'},
        text: String,
        image: String,
        comments: [{type: mongoose.Schema.Types.ObjectId, ref:'CommentModel'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "post"});

    return PostSchema;
};