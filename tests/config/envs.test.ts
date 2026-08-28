import { describe, expect, it } from 'vitest';
import { envs } from '../../src/config/envs.js';

describe('envs', () => {
    it('should be defined', () => {

        expect(envs).toEqual({
            "MONGO_DB_NAME": "todoAPI-test",
            "MONGO_PASS": "Demmal1313",
            "MONGO_URL": "mongodb://test:Demmal1313@localhost:27017/",
            "MONGO_USER": "test",
            "PORT": 3001,
        });

    });
});