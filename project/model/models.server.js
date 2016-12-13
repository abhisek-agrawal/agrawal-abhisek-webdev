module.exports = function () {

    // var mongoose = require('mongoose');
    // mongoose.createConnection('mongodb://localhost/web-app-maker');

    var peopleModel = require('./people/people.model.server')();
    var followModel = require('./follow/follow.model.server')();
    var postModel = require('./post/post.model.server')();
    var commentModel = require('./comment/comment.model.server')();
    var appointmentModel = require('./appointment/appointment.model.server')();

    var model = {
        peopleModel: peopleModel,
        followModel: followModel,
        postModel: postModel,
        commentModel: commentModel,
        appointmentModel: appointmentModel
    };

    peopleModel.setModel(model);
    followModel.setModel(model);
    postModel.setModel(model);
    commentModel.setModel(model);
    appointmentModel.setModel(model);

    return model;
};