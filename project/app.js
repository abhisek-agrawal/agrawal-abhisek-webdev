module.exports = function(app) {

    var model = require("./model/models.server")();

    require("./services/people.service.server.js")(app, model);
    require("./services/follow.service.server.js")(app, model);
    require("./services/post.service.server.js")(app, model);
    require("./services/comment.service.server.js")(app, model);
    require("./services/appointment.service.server.js")(app, model);
};