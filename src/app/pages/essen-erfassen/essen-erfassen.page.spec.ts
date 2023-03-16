import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {IonicModule} from "@ionic/angular";

import {EssenErfassenPage} from "./essen-erfassen.page";

describe("EssenErfassenPage", () => {
    let component: EssenErfassenPage;
    let fixture: ComponentFixture<EssenErfassenPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [EssenErfassenPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(EssenErfassenPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
