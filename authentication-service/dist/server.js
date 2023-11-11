"use strict";
// serverConfig.ts
Object.defineProperty(exports, "__esModule", { value: true });
const serverConfig = (server, config) => {
    const startServer = () => {
        server.listen(config.port, () => {
            console.log(`Server listening on port ${config.port} - userService`);
        });
    };
    return {
        startServer,
    };
};
exports.default = serverConfig;
