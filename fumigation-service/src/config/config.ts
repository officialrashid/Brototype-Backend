import dotenv from "dotenv"
export default {
    port: 3000,
    mongo: {
      uri: 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Fumigation?retryWrites=true&w=majority'
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 