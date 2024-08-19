interface Config {
    baseUrl: string;
  }
  const checkConfig = (server: string): Config | {} => {
    let config: Config | {} = {};
    switch (server) {
      case "production":
        config = {
          baseUrl: "",
        };
        break;
      case "local":
        config = {
          baseUrl: "http://localhost:3000/",
        };
        break;
      default:
        break;
    } 
    return config;
  };
  
  export const selectServer = "Local";
  export const config = checkConfig(selectServer) as Config;