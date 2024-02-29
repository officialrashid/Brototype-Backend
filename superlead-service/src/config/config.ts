export default {
    port: 8001,
    mongo: {
      uri: 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Superlead?retryWrites=true&w=majority'
    },
    secretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 