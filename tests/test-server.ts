import { Server } from "../src/presentation/server.js";
import { envs } from "../src/config/envs.js";
import { AppRoutes } from "../src/presentation/routes.js";
import { MongoDatabase } from "../src/infrastructure/data/mongo/init.js";


export const testServer = new Server({ port: envs.PORT, routes: AppRoutes.Routes });