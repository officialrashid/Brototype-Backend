// serverConfig.ts

require('dotenv').config();
const serverConfig = (server: any, config: any) => {

  const startServer = () => {
    
    server.listen(config.port, () => {

      console.log(`Server listening on port ${config.port} - fumigation-service`);
    });
  };

  return {
    startServer,
  };
};

export default serverConfig;
