export default {
    port: 5001,
    mongo: {
      uri: 'mongodb+srv://muhammedrashi59:SUxzxasGOgEgKKPb@micro.1nbiei8.mongodb.net/Brototype-Reviewer?retryWrites=true&w=majority'
    },
    jwtAccessSecretKey:process.env.ACCESS_TOKEN_SECRET||'secretidofAccessTokenjwt',
  };
 