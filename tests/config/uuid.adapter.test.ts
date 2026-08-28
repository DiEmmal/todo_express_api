import { describe, expect, it } from "vitest";
import { getUUID } from "../../src/config/index.js";

describe('UUID Adapter', () => {

    it('should generate a UUID', () => {

        const uuid = getUUID();

        expect(typeof uuid).toBe('string');
        expect(uuid).toHaveLength(36);

    });

})