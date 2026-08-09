import { envs } from "./config/envs.js";
import { AppRoutes } from "./routes.js";
import { Server } from "./server.js";


(async() => {

    const server = new Server({port: envs.PORT, routes: AppRoutes.Routes});

    server.start();

})();