import { envs } from "./config/envs.js";
import { MongoDatabase } from "./infrastructure/data/mongo/init.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";


(async () => {
    main();
})();

export async function main() {

    //*Database
    await MongoDatabase.connect({ dbName: envs.MONGO_DB_NAME, mongoURL: envs.MONGO_URL });


    //*Server
    const server = new Server({ port: envs.PORT, routes: AppRoutes.Routes });

    server.start();

};