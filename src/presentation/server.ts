import express, { Router } from 'express';
import compression from 'compression';

interface StartServerOptions {
    port: number;
    routes: Router;
}

export class Server {
    private app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: StartServerOptions) {
        this.port = options.port;
        this.routes = options.routes;
    }

    public start() {

        //* Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        this.app.use(compression());

        //*Routes
        this.app.use(this.routes);

        this.app.listen(this.port, () => console.log(`Server listening on port: ${this.port}`));

    };

}
