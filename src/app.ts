import { envs } from "./config/envs.js";
import { MongoDataBase } from "./infrastructure/data/mongo/init.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";


(async() => {

    //*Database
    try {
        await MongoDataBase.connect({dbName: envs.MONGO_DB_NAME, mongoURL: envs.MONGO_URL});
    } catch (error) {
        throw new Error('Cannot connect Mongo');
    };

    //*Server
    const server = new Server({port: envs.PORT, routes: AppRoutes.Routes});

    server.start();

})();
