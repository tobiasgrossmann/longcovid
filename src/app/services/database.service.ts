import { Injectable } from "@angular/core";
import { Plugins } from "@capacitor/core";
import "@capacitor-community/sqlite";
import { AlertController } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from, of } from "rxjs";
import { switchMap } from "rxjs/operators";
const { CapacitorSQLite, Device, Storage } = Plugins;

const DB_SETUP_KEY = "patient-strength-mobile-db";
const DB_NAME_KEY = "patient-strength-mobile-db";

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  dbReady = new BehaviorSubject(false);
  dbName = "";

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController
  ) { }

  async init(): Promise<void> {
    const info = await Device.getInfo();

    if (info.platform === "android") {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: "No DB access",
          message: "This app can't work without Database access.",
          buttons: ["OK"]
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }

  private async setupDatabase() {
    const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });

    if (!dbSetupDone.value) {
/*
      this.downloadDatabase();
*/
      return;
    } else {
      this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value;
      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
    }
  }

  // Potentially build this out to an update logic:
  // Sync your data on every app start and update the device DB
  private downloadDatabase(update = false) {
    fetch("./assets/database/db.json").then(res => res.json())
      .then(jsonExport => {
        const jsonstring = JSON.stringify(jsonExport);
        const isValid = CapacitorSQLite.isJsonValid({ jsonstring });

        if (isValid) {
          this.dbName = jsonExport.database;
           Storage.set({ key: DB_NAME_KEY, value: this.dbName });
           CapacitorSQLite.importFromJson({ jsonstring });
           Storage.set({ key: DB_SETUP_KEY, value: "1" });

          // Your potential logic to detect offline changes later
          if (!update) {
              // CapacitorSQLite.createSyncTable();
          } else {
             CapacitorSQLite.setSyncDate({ syncdate: "" + new Date().getTime() });
          }
          this.dbReady.next(true);
        }
      });
  }

  getTageList() {
    return this.dbReady.pipe(
      switchMap(isReady => {
        if (!isReady) {
          return of({ values: [] });
        } else {
          const statement = "SELECT * FROM tage;";
          return from(CapacitorSQLite.query({ statement, values: [] }));
        }
      })
    );
  }

  async getSymptomeById(id) {
    const statement = `SELECT * FROM symptome LEFT JOIN tage ON tage.id=tage.tage_id WHERE symptome.id=${id} ;`;
    return (await CapacitorSQLite.query({ statement, values: [] })).values[0];
  }

  getDatabaseExport(mode) {
    return CapacitorSQLite.exportToJson({ jsonexportmode: mode });
  }

  addDummyProduct(name, tage_id) {
    const statement = `INSERT INTO symptome (id, tage_id, symptom_name, created_at) VALUES ('${name}',);`;
    return CapacitorSQLite.execute({ statements: statement });
  }

  deleteProduct(tage_id) {
    const statement = `DELETE FROM symptome WHERE id = ${tage_id};`;
    return CapacitorSQLite.execute({ statements: statement });
  }

// For testing only..
  async deleteDatabase() {
    const dbName = await Storage.get({ key: DB_NAME_KEY });
    await Storage.set({ key: DB_SETUP_KEY, value: null });
    return CapacitorSQLite.deleteDatabase({ database: dbName.value });
  }

}
