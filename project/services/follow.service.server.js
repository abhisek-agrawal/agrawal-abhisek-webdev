module.exports = function(app, model) {

    app.post('/project/api/follow', createFollow);
    app.delete('/project/api/unFollow/:donorId/:recipientId', deleteFollow);

    ///////////////////////////////////////////////////////////////////////////

    function createFollow(req, res) {
        var load = req.body;
        var donorId = load.donorId;
        var recipientId = load.recipientId;

        model
            .followModel
            .createFollow(donorId, recipientId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteFollow(req, res) {
        var donorId = req.params.donorId;
        var recipientId = req.params.recipientId;

        model
            .followModel
            .deleteFollow(donorId, recipientId)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            )
    }

};