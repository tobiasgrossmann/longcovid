import {Injectable} from "@angular/core";

@Injectable()

export class DetailService {
    private existingConn: boolean;
    private exportJson: boolean;

    constructor() {
    }

    setExistingConnection(value: boolean) {
        this.existingConn = value;
    }

    getExistingConnection(): boolean {
        return this.existingConn;
    }

    setExportJson(value: boolean) {
        this.exportJson = value;
    }

    getExportJson(): boolean {
        return this.exportJson;
    }
}
