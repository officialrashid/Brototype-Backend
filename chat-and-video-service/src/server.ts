// serverConfig.ts
import socketConfguration from "../src/socket.io/socket.io";
const serverConfig = (server: any, config: any) => {

  const startServer = () => {
    
    const response = server.listen(config.port, () => {

      console.log(`Server listening on port ${config.port} - chatAndVideoService`);
    });
    if(response){
      socketConfguration(response)
    }
  };

  return {
    startServer,
  };
};

export default serverConfig;
