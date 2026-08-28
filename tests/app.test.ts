import { describe, expect, it, vi } from 'vitest';
import { MongoDatabase } from '../src/infrastructure/data/mongo/init.js';
import { Server } from '../src/presentation/server.js';
import { main } from '../src/app.js';
import { envs } from '../src/config/envs.js';


describe('TodoController', () => {

    const mongoSpy = vi.spyOn(MongoDatabase, 'connect');
    vi.mock('../src/presentation/server.js');

    it('should connect to database and start server', async () => {
        await main()

        expect(mongoSpy).toHaveBeenCalled();
        expect(mongoSpy).toHaveBeenCalledWith({ dbName: envs.MONGO_DB_NAME, mongoURL: envs.MONGO_URL });

        expect(Server.prototype.start).toHaveBeenCalled();
        expect(Server).toHaveBeenCalledWith({
            port: envs.PORT,
            routes: expect.any(Function),
        });

    });

});