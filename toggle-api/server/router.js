var handleRequest = require('./handle-request');

// Define routes for API and specify action
function setRoutes(app) {
    app.post("/api/power/on", handleRequest.powerOn);
    app.post("/api/power/off", handleRequest.powerOff);
    app.post("/api/status", handleRequest.status);
    app.post("/api/register", handleRequest.register);
}

module.exports = setRoutes;