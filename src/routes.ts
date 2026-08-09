import { Router} from "express";
import { TodoRoutes } from "./todos/routes.todo.js";

export class AppRoutes {

    static get Routes(): Router {
        const router = Router();

        router.use('/api/todos', TodoRoutes.Routes);

        return router;
    }

}