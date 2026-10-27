import { describe, expect, it } from 'vitest';
import { envs } from '../../src/config/envs.js';

describe('envs', () => {
    it('should be defined', () => {

        expect(envs).toEqual({
            "MONGO_DB_NAME": "todoAPI-test",
            "MONGO_PASS": "test",
            "MONGO_URL": "mongodb://diemmal:test@localhost:27017/",
            "MONGO_USER": "diemmal",
            "PORT": 3001,
        });

    });
});