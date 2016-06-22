import { QueryBuilderService } from '../app/shared/query-builder/query-builder';

describe('QueryBuilder Service Tests', () => {
    it('Intantiates Okay', () => {
        let service = new QueryBuilderService();
        expect(service).not.toBe(null);
    });

    it('Generates proper query for OrderBy', () => {
        let service = new QueryBuilderService();
        service = service.orderBy([
            {
                propName: "test_prop1"
            },
            {
                propName: "test_prop2",
                orderDirection: "desc"
            },
            {
                propName: "test_prop3",
                orderDirection: "asc"
            }]);
        let qstring = service.ToQueryString();
        expect(qstring).toBe("?$orderby=test_prop1 asc,test_prop2 desc,test_prop3 asc");
    });
});

