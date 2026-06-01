/**
 * GoDaddy / generic Node host entrypoint.
 * cPanel Node.js Selector: set "Application startup file" to start.cjs
 */
process.env.NODE_ENV = "production";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";
process.env.PORT = process.env.PORT || process.env.GODADDY_PORT || "3000";

require("./server.js");
