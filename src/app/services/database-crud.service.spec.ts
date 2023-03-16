import {TestBed} from "@angular/core/testing";

import {DatabaseCrudService} from "./database-crud.service";

describe("DatabaseCrudService", () => {
    let service: DatabaseCrudService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DatabaseCrudService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
