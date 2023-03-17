import {Component, OnInit} from "@angular/core";
import {environment} from "../../../environments/environment.prod";

@Component({
    selector: "app-impressum",
    templateUrl: "./impressum.page.html",
    styleUrls: ["./impressum.page.scss"],
})
export class ImpressumPage implements OnInit {
    public version: string = environment.version;

    constructor() {
    }

    ngOnInit() {
    }

}
