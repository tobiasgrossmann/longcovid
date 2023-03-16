import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {IonicModule} from "@ionic/angular";

import {TagebuchTimelinePage} from "./tagebuch-timeline.page";

describe("TagebuchTimelinePage", () => {
    let component: TagebuchTimelinePage;
    let fixture: ComponentFixture<TagebuchTimelinePage>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TagebuchTimelinePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(TagebuchTimelinePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
