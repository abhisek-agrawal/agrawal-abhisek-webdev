module.exports = function(app, model) {

    app.post('/project/api/appointment/:recipientId/:donorId', createAppointment);
    app.get('/project/api/news/appointments/:recipientId', findRecipientAppointments);
    app.put('/project/api/appointment/:appointmentId', updateAppointment);
    app.get('/project/api/profile/appointments/:donorId', findAppointmentsByDonorId);

    ///////////////////////////////////////////////////////////////////////////

    function createAppointment(req, res) {
        var recipientId = req.params.recipientId;
        var donorId = req.params.donorId;
        var appointment = req.body;

        model
            .appointmentModel
            .createAppointment(recipientId, donorId, appointment)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findRecipientAppointments(req, res) {
        var recipientId = req.params.recipientId;

        model
            .appointmentModel
            .findRecipientAppointments(recipientId)
            .then(
                function(appointments) {
                    res.send(appointments);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateAppointment(req, res) {
        var appointmentId = req.params.appointmentId;
        var load = req.body;

        model
            .appointmentModel
            .updateAppointment(appointmentId, load)
            .then(
                function(status) {
                    res.sendStatus(200);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAppointmentsByDonorId(req, res) {
        var donorId = req.params.donorId;

        model
            .appointmentModel
            .findAppointmentsByDonorId(donorId)
            .then(
                function(appointments) {
                    res.send(appointments);
                },
                function(error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};