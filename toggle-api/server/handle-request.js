var createResponse = require('./create-response');
var interface = require('./application-interface');
var getDevices = require('./../database').devices;

// Do interface-call and send response back
function callInterface(request, response, interfaceCall, createResponseCall) {
    var reqBody = JSON.parse(request.body);
    var id = reqBody.id;
    getDevices(function(devices){
        var deviceIp = devices[id]
        interfaceCall(deviceIp, function (error, msg) {
            if (error) {
                console.log("Could not call interface: " + error)
                return createResponse.error(error, function (res) {
                    response.send(res);
                });
            }
            createResponseCall(msg, function (res) {
                response.send(res);
            });
        });
    });
}

// Specify the request actions and responses
var requestActions = {
    powerOn: function (request, response) {
        callInterface(request, response, interface.turnOn, createResponse.on);
    },

    powerOff: function (request, response) {
        callInterface(request, response, interface.turnOff, createResponse.off);
    },

    connectionStatus: function (request, response) {
        callInterface(request, response, interface.connectionStatus, createResponse.connectionStatus);
    }
}

module.exports = requestActions;