import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TagesformErfassenPage } from "./tagesform-erfassen.page";

describe("TagesformErfassenPage", () => {
  let component: TagesformErfassenPage;
  let fixture: ComponentFixture<TagesformErfassenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagesformErfassenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TagesformErfassenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
