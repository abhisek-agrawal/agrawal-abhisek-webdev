module.exports = function () {

    var model = {};

    var mongoose = require('mongoose');
    var AppointmentSchema = require('./appointment.schema.server')();

    var AppointmentModel = mongoose.model("AppointmentModel", AppointmentSchema);

    var api = {
        createAppointment           : createAppointment,
        findRecipientAppointments   : findRecipientAppointments,
        updateAppointment           : updateAppointment,
        findAppointmentsByDonorId   : findAppointmentsByDonorId,
        setModel                    : setModel
    };
    return api;

    ////////////////////////////////////////////////////////////

    function createAppointment(recipientId, donorId, appointment) {
        return model.peopleModel
                .findPeopleById(donorId)
                .then(
                    function(donorObj) {
                        return model.peopleModel
                                .findPeopleById(recipientId)
                                .then(
                                    function(recipientObj) {
                                        appointment._recipient = recipientObj;
                                        appointment._donor = donorObj;
                                        return AppointmentModel
                                                .create(appointment)
                                                .then(
                                                    function(appointmentObj) {
                                                        return appointmentObj;
                                                    },
                                                    function(error) {
                                                        console.log(error);
                                                    }
                                                )
                                    },
                                    function(error) {
                                        console.log(error);
                                    }
                                );
                    },
                    function(error) {
                        console.log(error);
                    }
                );
    }

    function findRecipientAppointments(recipientId) {
        return AppointmentModel
            .find({
                _recipient: recipientId
            })
            .populate('_donor')
            .exec();
    }

    function updateAppointment(appointmentId, load) {
        return AppointmentModel
            .update(
                { _id: appointmentId },
                load
            );
    }

    function findAppointmentsByDonorId(donorId) {
        return AppointmentModel
            .find({ _donor: donorId })
            .populate('_recipient')
            .exec();
    }

    function setModel(_model) {
        model = _model;
    }

};