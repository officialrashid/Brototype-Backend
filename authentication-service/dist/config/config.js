"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    port: 3001,
    mongo: {
        uri: 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Students?retryWrites=true&w=majority'
    },
    jwtAccessSecretKey: process.env.ACCESS_TOKEN_SECRET || 'secretidofAccessTokenjwt',
};
