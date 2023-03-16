import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { AktivitaetenErfassenPage } from "./aktivitaeten-erfassen.page";

describe("AktivitaetenErfassenPage", () => {
  let component: AktivitaetenErfassenPage;
  let fixture: ComponentFixture<AktivitaetenErfassenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AktivitaetenErfassenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AktivitaetenErfassenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
