// serverConfig.ts

const serverConfig = (server: any, config: any) => {

  const startServer = () => {
    
    server.listen(config.port, () => {

      console.log(`Server listening on port ${config.port} - authService`);
    });
  };

  return {
    startServer,
  };
};

export default serverConfig;
