// serverConfig.ts
import socketConnection from "../src/socket.io/socket.io";
const serverConfig = (server: any, config: any) => {
   let socketServer;
  const startServer = async  () => {
    
   socketServer= await server.listen(config.port, () => {

      console.log(`Server listening on port ${config.port} - chatAndVideoService`);
      
    });
    if(socketServer){
      await socketConnection(socketServer);
    }
 
  };

  return {
    startServer,
  };
};

export default serverConfig;
