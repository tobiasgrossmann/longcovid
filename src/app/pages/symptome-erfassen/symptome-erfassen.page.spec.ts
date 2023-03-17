import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {IonicModule} from "@ionic/angular";

import {SymptomeErfassenPage} from "./symptome-erfassen.page";

describe("SymptomeErfassenPage", () => {
    let component: SymptomeErfassenPage;
    let fixture: ComponentFixture<SymptomeErfassenPage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SymptomeErfassenPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(SymptomeErfassenPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
