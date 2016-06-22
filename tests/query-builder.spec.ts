import { QueryBuilderService } from '../app/shared/query-builder/query-builder';
import * from '@angular/core';

describe('QueryBuilder Service Tests', () => {
    it('Intantiates Okay', () => {
        var service = new QueryBuilderService("");
        expect(service).not.toBe(null);
    });
});