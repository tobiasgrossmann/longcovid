import {Injectable} from "@angular/core";
import {CapacitorSQLite} from "@capacitor-community/sqlite";
import {checkIfDBExists, deleteDatabase} from "../utils/db-utils";
import {patientStrengthStartupData, patientStrengthStartupSchema} from "../utils/db-startup-json";
import {SQLiteService} from "./sqlite.service";
import {DetailService} from "./detail.service";
// import moment from "moment-timezone";
import { EssenRepository } from "./db/repository/EssenRepository";
import { AktivitaetRepository } from "./db/repository/AktivitaetRepository";
import { SymptomRepository } from "./db/repository/SymptomRepository";
import { TagesformRepository } from "./db/repository/TagesformRepository";
import { Essen } from "../utils/interfaces";

@Injectable({
    providedIn: "root"
})
export class DatabaseCrudService {
    dbName = "";
    db: any;
    result: any;
    export = null;
    public wantedBackupsNumber: number;
    private currentDatabaseVersion: number;
    public essenRepository: EssenRepository;
    public symptomRepository: SymptomRepository;
    public aktivitaetRepository: AktivitaetRepository;
    public tagesformRepository: TagesformRepository;
    constructor(private sqliteService: SQLiteService,
                private detailService: DetailService) {}

    setWantedBackupsNumber(wantedBackupsNumber: number) {
      this.wantedBackupsNumber = wantedBackupsNumber;
      console.log(this.wantedBackupsNumber);
      localStorage.setItem("wantedBackupsNumber", wantedBackupsNumber.toString());
    }

    getWantedBackupsNumber() {
      const wantedBackupsNumber = localStorage.getItem("wantedBackupsNumber");
      this.wantedBackupsNumber = Number(wantedBackupsNumber);
      console.log(this.wantedBackupsNumber);
      return this.wantedBackupsNumber;
    }

    getDatabaseExport(mode) {
        return CapacitorSQLite.exportToJson({database: this.dbName, jsonexportmode: mode});
    }

  /*
  * STARTUP PROCESS
  *
  *
  * */

   async  checkIsDatabaseConnection(): Promise<boolean> {
    const checkExistingConnection = await this.sqliteService.isConnection(this.dbName);
    // await this.sqliteService.closeConnection(this.dbName); //FIXME: this is for live reload to work properly. Add after first run.
    console.log(">>>> checkIsDatabaseConnection: " + checkExistingConnection.result + " for db: " + this.dbName);
    return checkExistingConnection.result;
  }

    async openDatabaseConnectionAndReturnDatabaseBoolean(): Promise<boolean> {
      console.log(">>>> openDatabaseConnection start");
      this.dbName = patientStrengthStartupData.database;
      console.log(">>>> openDatabaseConnection this.dbName: " + this.dbName);

      /*
      * Check for existing Connection to SQLite if not then create a connection
      * */

      const checkExistingConnection = await this.checkIsDatabaseConnection();

      if (checkExistingConnection === false) {
        console.log(">>>> checkExistingConnection: " + checkExistingConnection);

        const currentDatabaseVersion: number = await this.getDatabaseVersionFromLocalStorage();
        console.log(">>>> currentDatabaseVersion: " + currentDatabaseVersion);

        this.db = await this.sqliteService
          .createConnection(this.dbName, false,
            "no-encryption", currentDatabaseVersion);
            this.essenRepository = new EssenRepository(this.db);
            this.symptomRepository = new SymptomRepository(this.db);
            this.aktivitaetRepository = new AktivitaetRepository(this.db);
            this.tagesformRepository = new TagesformRepository(this.db);

        if (this.db === null) {
          console.log(">>>> this.db = null -> rejecting Promise:  " + this.db);
          return Promise.reject(new Error("CreateConnection" + this.dbName + "failed"));
        }

      } else if (checkExistingConnection === true) {
        console.log(">>>> currentDatabaseVersion: " + checkExistingConnection);
        console.log(">>>> Hurray! DatabaseConnection exists");

      } else {
        console.log(">>>> currentDatabaseVersion: " + checkExistingConnection);
        console.log(">>>> Oh no! createConneciton failed -> rejecting Promise");
        return Promise.reject(new Error("CreateConnection" + this.dbName + "failed"));
      }

      /*
      * Checking if database exists and returns boolean
      * */

      const dbExists = await checkIfDBExists(this.db);
      console.log(">>>> dbExists: " + dbExists);

      if (dbExists === true) {
        console.log(">>>> dbExists: " + dbExists);
        console.log(">>>> Hurray! Database exists");

        return dbExists;

      } else if (dbExists === false) {
        // returns false
        console.log(">>>> dbExists: " + dbExists);
        console.log(">>>> Oh no! No database");
        return dbExists;

      } else {
        console.log(">>>> dbExists: " + dbExists);
        console.log(">>>> Oh no! Database error or missing -> rejecting Promise");

        return Promise.reject(new Error("Database error or missing"));

      }
    }


    async createDatabaseFromJSON(): Promise<void> {
        try {
            // test Json object validity
            this.result = await this.sqliteService
                .isJsonValid(JSON.stringify(patientStrengthStartupData));
            if (!this.result.result) {
                return Promise.reject(new Error("IsJsonValid failed"));
            }
            console.log("$$$ patientStrengthStartupData Json Object is valid $$$");
            this.dbName = patientStrengthStartupData.database;

            // check if the databases exist
            // and delete it for multiple successive tests
            await deleteDatabase(this.db);

            // full import
            this.result = await this.sqliteService
                .importFromJson(JSON.stringify(patientStrengthStartupData));
            console.log(`full import result ${this.result.changes.changes}`);
            if (this.result.changes.changes === -1) {
                return Promise.reject(new Error("ImportFromJson 'full' patientStrengthStartupData failed"));
            }

            // open db "db-from-json"
            await this.db.open();

            // create synchronization table
            this.result = await this.db.createSyncTable();
            if (this.result.changes.changes < 0) {
                return Promise.reject(new Error("CreateSyncTable failed"));
            }

            this.result = await this.db.getSyncDate();
            if (this.result.length === 0) {
                return Promise.reject(new Error("GetSyncDate failed"));
            }
            console.log("$$ syncDate " + this.result);

            this.detailService.setExportJson(true);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async createDatabaseFromBackup(backupData: any): Promise<void> {
        try {
            console.log(backupData);
            // test Json object validity
            this.result = await this.sqliteService
                .isJsonValid(JSON.stringify(backupData));
            if (!this.result.result) {
                return Promise.reject(new Error("IsJsonValid failed"));
            }
            console.log("$$$ Backup Json Object is valid $$$");
            this.dbName = backupData.database;

            // check if the databases exist
            // and delete it for multiple successive tests
            await deleteDatabase(this.db);

            // full import
            this.result = await this.sqliteService
                .importFromJson(JSON.stringify(backupData));
            console.log(`full import result ${this.result.changes.changes}`);
            if (this.result.changes.changes === -1) {
                return Promise.reject(new Error("ImportFromJson 'full' Backup failed"));
            }

            // open db "db-from-json"
            await this.db.open();

            // create synchronization table
            this.result = await this.db.createSyncTable();
            if (this.result.changes.changes < 0) {
                return Promise.reject(new Error("CreateSyncTable failed"));
            }

            this.result = await this.db.getSyncDate();
            if (this.result.length === 0) {
                return Promise.reject(new Error("GetSyncDate failed"));
            }
            console.log("$$ syncDate " + this.result);

            this.detailService.setExportJson(true);
            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    }

    async createJSONFromDatabase(): Promise<void> {
        try {
            let result: any;

            // ************************************************
            // Full Export json
            // ************************************************
            const jsonObj: any = await this.db.exportToJson("full");

            // test Json object validity
            result = await this.sqliteService
                .isJsonValid(JSON.stringify(jsonObj.export));
            if (!result.result) {
                return Promise.reject(new Error("IsJsonValid 'full' export failed "));
            }

            return jsonObj;
        } catch (err) {
            return Promise.reject(err);
        }

    }

    async compareCurrentDatabaseExportedJSONWithSchemaJSON() {
        // get current database as JSON
        const currentDatabase: any = await this.db.exportToJson("full");

        const currentDatabaseKeys = [];

        currentDatabase.export.tables.forEach(item => {
            currentDatabaseKeys.push(item.schema.length);
        });

        // get schema as JSON
        const schemaJSON = await patientStrengthStartupData;
        if (!schemaJSON) {
            return Promise.reject(new Error("IsJsonValid failed"));
        }

        const schemaJSONKeys = [];

        schemaJSON.tables.forEach(item => {
            schemaJSONKeys.push(item.schema.length);
        });

        const comparisonResult = await this.checkEquals(currentDatabaseKeys, schemaJSONKeys);

        return comparisonResult;
    }

    async checkEquals(a, b) {
        if (JSON.stringify(a) === JSON.stringify(b)) {
            return true;
        } else {
            return false;
        }
    }

     async getDatabaseVersionFromDBandSetToLocalStorage() {
        const version = await this.db.getVersion();
        this.currentDatabaseVersion = version.version;
        console.log("databaseVersion: " + this.currentDatabaseVersion);
        this.setDatabaseVersionToLocalStorage(this.currentDatabaseVersion);
        return this.currentDatabaseVersion;
    }

     async getDatabaseVersionFromLocalStorage() {
      const version = await localStorage.getItem("databaseVersion");
      this.currentDatabaseVersion = Number(version);
      console.log("databaseVersion: " + this.currentDatabaseVersion);
      return this.currentDatabaseVersion;
    }

     async setDatabaseVersionToLocalStorage(version: number) {
      await localStorage.setItem("databaseVersion", version.toString());
    }

    async upgradeDatabaseSchema() {
      console.log(">>>> upgradeDatabaseSchema start");

      const currentDatabaseVersion: number = await this.getDatabaseVersionFromDBandSetToLocalStorage();
      console.log(">>>> currentDatabaseVersion: " + currentDatabaseVersion);

      const futureDatabaseVersion: number = currentDatabaseVersion + 1;
      console.log(">>>> futureDatabaseVersion: " + futureDatabaseVersion);

      const currentDatabase: any = await this.db.exportToJson("full");
      console.log(">>>> currentDatabase: " + currentDatabase);

      await this.sqliteService.closeConnection(this.dbName);
      console.log(">>>> closed old Connection");

      console.log(">>>> addUpgradeStatement start");

      await this.sqliteService.addUpgradeStatement(
          this.dbName,
        currentDatabaseVersion,
        futureDatabaseVersion,
          patientStrengthStartupSchema,
          currentDatabase.export.values
      );
      console.log(">>>> addUpgradeStatement done");

      console.log(">>>> creating Connection again");
      // open the database
      this.db = await this.sqliteService
          .createConnection(this.dbName, false,
              "no-encryption", futureDatabaseVersion);
      console.log(">>>> created Connection: " + this.db);

      if (this.db === null) {
          console.log(">>>> this.db = null -> rejecting Promise:  " + this.db);
          return Promise.reject(new Error("CreateConnection" + this.dbName + "failed"));
      }

      console.log(">>>> open Database again");
      await this.db.open();
      console.log(">>>> Hurray! Database again opened");


    }

    async openDatabase() {
        await this.db.open();
/*
        console.log("Opened Database!");
*/
    }

    // Mode is either "partial" or "full"
    async createDatabaseExport(mode) {
        const jsonObj: any = await this.db.exportToJson(mode);

        console.log("$$$ jsonObj " + JSON.stringify(jsonObj));
        // test Json object validity
        this.result = await this.sqliteService
            .isJsonValid(JSON.stringify(jsonObj.export));

        if (!this.result.result) {
            return Promise.reject(new Error("Fehler! Datenbankexport gescheitert!"));
        } else {
            this.export = JSON.stringify(jsonObj.export);
            return this.export;
        }
    }

    async getTablesCombined(): Promise<any> {
        const t0 = performance.now();
        // eslint-disable-next-line max-len
        const queryStatement = "SELECT * FROM tage INNER JOIN symptome ON symptome.tageid = tage.id INNER JOIN essen ON essen.tageid = tage.id INNER JOIN tagesform ON tagesform.tageid = tage.id INNER JOIN aktivitaeten ON aktivitaeten.tageid = tage.id ORDER BY date DESC;";
        const queryResult = await this.db.query(queryStatement);
        const t1 = performance.now();
        if (queryResult === undefined) {
            throw new Error("Query" + queryStatement + "failed");
        } else {
            console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
            return queryResult;
        }
    }

    async getTageList(): Promise<any> {
        const t0 = performance.now();
        const queryStatement = "SELECT * FROM tage ORDER BY date DESC;";
        const queryResult = await this.db.query(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Query" + queryStatement + "failed");
        } else {
            const t1 = performance.now();
            console.log(`Call to tage took ${t1 - t0} milliseconds.`);
            return queryResult;
        }
    }

    async getTagesInRnage(startIndex: number, limit: number): Promise<any> {
        const t0 = performance.now();
        const queryStatement = "SELECT * FROM tage ORDER BY date DESC LIMIT " + limit + " OFFSET " + startIndex + ";";
        const queryResult = await this.db.query(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Query" + queryStatement + "failed");
        } else {
            const t1 = performance.now();
            console.log(`Call to tage took ${t1 - t0} milliseconds.`);
            return queryResult;
        }
    }

    async getSymptomeList(): Promise<any> {
        return this.symptomRepository.findAll();
    }

    async getSymptomeListbyTagId(tagId: number): Promise<any> {
        return this.symptomRepository.findOne(tagId);
    }

    async getAktivitaetenListbyTagId(tagId: number): Promise<any> {
        return this.aktivitaetRepository.findOne(tagId);
    }

    async getEssenList(): Promise<Essen[]> {
        return this.essenRepository.findAll();
    }

    async getEssenListbyTagId(tagId: number): Promise<any> {
        return this.essenRepository.findOne(tagId);
    }

    async getTagesformList(): Promise<any> {
        return this.tagesformRepository.findAll();
    }

    async getTagesformListAndIdDate(): Promise<any> {
        const queryStatement = "SELECT * FROM tage INNER JOIN tagesform ON tagesform.tageid = tage.id ORDER BY date DESC;";
        const queryResult = await this.db.query(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Query failed:" + queryStatement);
        } else {
            return queryResult;
        }
    }

    async getAktivitaetList(): Promise<any> {
        return this.aktivitaetRepository.findAll();
    }

    async getTagesformListbyTagId(tagId: number): Promise<any> {
        return this.tagesformRepository.findOne(tagId);
    }

    async updateSymptomeNames(tageid: number,
                              symptomNames: string,
                              symptomNamesCheckboxes: string,
                              hustenValue: number,
                              fieberValue: number,
                              fatigueValue: number,
                              kurzatmigkeitValue: number,
                              brustschmerzenValue: number,
                              kopfschmerzenValue: number,
                              geschmacksverlustValue: number,
                              neurologischeStoerungValue: number,
                              muskelschmerzenValue: number,
                              hautausschlagValue: number,
                              missempfindungenValue: number,
                              schwindelValue: number,
                              gedaechtniseinschraenkungenValue: number,
                              leseeinschraenkungenValue: number
                              ) {
        const nowTimestamp = new Date().toISOString().split(".")[0];
        const queryStatement = `UPDATE symptome SET symptom_names = '${symptomNames}',
                symptom_names_checkboxes = '${symptomNamesCheckboxes}',
                husten_value = '${hustenValue}',
                fieber_value = '${fieberValue}',
                fatigue_value = '${fatigueValue}',
                kurzatmigkeit_value = '${kurzatmigkeitValue}',
                brustschmerzen_value = '${brustschmerzenValue}',
                kopfschmerzen_value = '${kopfschmerzenValue}',
                geschmacksverlust_value = '${geschmacksverlustValue}',
                neurologische_stoerung_value = '${neurologischeStoerungValue}',
                muskelschmerzen_value = '${muskelschmerzenValue}',
                hautausschlag_value = '${hautausschlagValue}',
                missempfindungen_value = '${missempfindungenValue}',
                schwindel_value = '${schwindelValue}',
                gedaechtniseinschraenkungen_value = '${gedaechtniseinschraenkungenValue}',
                leseeinschraenkungen_value = '${leseeinschraenkungenValue}',
                last_modified = '${nowTimestamp}' WHERE tageid = ${tageid};`;
        const queryResult = await this.db.execute(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Execution failed:" + queryStatement);
        } else {
            return queryResult;
        }
    }

    async updateAktivitaetenNames(tageid: number,
                              aktivitaetenNames: string,
                              aktivitaetenCheckboxNames: string,
                              sportValue: number,
                              arbeitValue: number,
                              hausarbeitValue: number,
                              entspannungValue: number
    ) {
        const nowTimestamp = new Date().toISOString().split(".")[0];
        const queryStatement = `UPDATE aktivitaeten SET aktivitaeten_names = '${aktivitaetenNames}',
                aktivitaeten_names_checkboxes = '${aktivitaetenCheckboxNames}',
                sport_value = '${sportValue}',
                arbeit_value = '${arbeitValue}',
                hausarbeit_value = '${hausarbeitValue}',
                entspannung_value = '${entspannungValue}',
                last_modified = '${nowTimestamp}' WHERE tageid = ${tageid};`;
        const queryResult = await this.db.execute(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Execution failed:" + queryStatement);
        } else {
            return queryResult;
        }
    }

    async updateEssenNames(tageid: number, vormittagEssen: string, mittagEssen: string, abendEssen: string, medikamente: string) {
        const essen: Essen = {
            id: null,
            tageid,
            vormittag: vormittagEssen,
            mittag: mittagEssen,
            abend: abendEssen,
            medikamenteValue: medikamente,
            lastModified: new Date().toISOString().split(".")[0]
        };
        return this.essenRepository.update(tageid, essen);
    }

    async updateTagesformNames(tageid: number, tagesformValue: number, erschoepfungsartValue: number,
        schlafValue: number, stimmungValue: number) {
        const nowTimestamp = new Date().toISOString().split(".")[0];
        const queryStatement = `UPDATE tagesform SET tagesform_value = '${tagesformValue}',
                                erschoepfungsart_value = '${erschoepfungsartValue}',
                                schlaf_value = '${schlafValue}',
                                stimmung_value = '${stimmungValue}',
                                last_modified = '${nowTimestamp}' WHERE tageid = ${tageid};`;
        const queryResult = await this.db.execute(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Execution failed:" + queryStatement);
        } else {
            return queryResult;
        }
    }

    /*
    * CHECK DATE SERVICES
    * */

    // async checkSameDate(date: string): Promise<boolean> {
    //     console.log(date);
    //     console.log(date.slice(0,10));
    //     const queryStatementTagQuery = "SELECT date FROM tage ORDER BY date DESC;";
    //     const queryResultTagQuery = await this.db.query(queryStatementTagQuery);
    //     console.log(queryResultTagQuery);
    //     if (queryResultTagQuery.values.length > 0) {
    //         const d = moment(date).isSame(queryResultTagQuery.values[0]?.date, "day");
    //         console.log(d);
    //         return moment(date).isSame(queryResultTagQuery.values[0]?.date, "day");
    //     } else if (queryResultTagQuery.values.length === 0) {
    //         return false;
    //     }
    // }


    async checkSameDateAnyDay(date: string): Promise<boolean> {
        console.log(date);
        const searchDate = date.slice(0,10);
        const queryStatementTagQuery = `SELECT date FROM tage WHERE date LIKE '%${searchDate}%' ORDER BY date DESC;`;
        const queryResultTagQuery = await this.db.query(queryStatementTagQuery);
        console.log(queryResultTagQuery);
        if (queryResultTagQuery.values.length > 0) {
            return true;
        } else if (queryResultTagQuery.values.length === 0) {
            return false;
        }
    }

    /*
    * CREATE SERVICES
    * */

    async postNeuerTagAnyDay(date: string) {
        console.log(date);
        const isSameDayDate = await this.checkSameDateAnyDay(date);
        console.log(isSameDayDate);

        if (isSameDayDate === false) {

            const queryStatementTag = `INSERT OR IGNORE INTO tage (date) VALUES ('${date}');`;
            await this.db.execute(queryStatementTag);

            const queryStatementTagQuery = `SELECT * FROM tage WHERE date = '${date}';`;
            const queryResultTagQuery = await this.db.query(queryStatementTagQuery);

            this.postNeuesEssen(queryResultTagQuery.values[0]?.id);
            this.postNeueSymptome(queryResultTagQuery.values[0]?.id);
            this.postNeueTagesform(queryResultTagQuery.values[0]?.id);
            this.postNeueAktivitaeten(queryResultTagQuery.values[0]?.id);

            if (queryResultTagQuery === undefined) {
                throw new Error("Execution failed:" + queryResultTagQuery);
            } else {
                return queryResultTagQuery;
            }

        } else {
            throw new Error("Fehler! Eintrag für diesen Tag bereits vorhanden.");
        }
    }

    async postNeuerTag(datum: string) {

        const isSameDayDate = await this.checkSameDateAnyDay(datum);

        if (isSameDayDate === false) {

            const queryStatementTag = `INSERT OR IGNORE INTO tage (date) VALUES ('${datum}');`;
            await this.db.execute(queryStatementTag);

            const queryStatementTagQuery = `SELECT id FROM tage WHERE date = '${datum}';`;
            const queryResultTagQuery = await this.db.query(queryStatementTagQuery);

            await this.postNeuesEssen(queryResultTagQuery.values[0]?.id);
            await this.postNeueSymptome(queryResultTagQuery.values[0]?.id);
            await this.postNeueTagesform(queryResultTagQuery.values[0]?.id);
            await this.postNeueAktivitaeten(queryResultTagQuery.values[0]?.id);

            if (queryResultTagQuery === undefined) {
                throw new Error("Execution failed:" + queryResultTagQuery);
            } else {
                return queryResultTagQuery;
            }

        } else if (isSameDayDate === true) {
          console.log("Entry already existing for this day!");
        } else {
            throw new Error("Create new Day error");
        }

    }

    async postNeuesEssen(tageid: number) {
       return this.essenRepository.createOneEmpty(tageid);
    }

    async postNeueSymptome(tageid: number) {
        return this.symptomRepository.createOneEmpty(tageid);
    }

    async postNeueTagesform(tageid: number) {
        return this.tagesformRepository.createOneEmpty(tageid);
    }

    async postNeueAktivitaeten(tageid: number) {
        return this.aktivitaetRepository.createOneEmpty(tageid);
    }

    /*
    * DELETE SERVICES
    * */

    async deleteTagAnyDay(deleteDate: string) {
        console.log(deleteDate);

        const queryStatementDeleteIdQuery = `SELECT id FROM tage WHERE date LIKE '%${deleteDate}%';`;
        const queryResultDeleteIdQuery = await this.db.query(queryStatementDeleteIdQuery);
        console.log(queryResultDeleteIdQuery);
        const id = parseInt(queryResultDeleteIdQuery.values[0]?.id);

        await this.deleteNeuesEssenById(id);
        await this.deleteNeueSymptomeById(id);
        await this.deleteAktivitaetenById(id);
        await this.deleteTagesformById(id);

        const queryStatementTagQuery = `DELETE FROM tage WHERE date LIKE '%${deleteDate}%';`;
        const queryResultTagQuery = await this.db.query(queryStatementTagQuery);
        console.log(queryResultTagQuery);

        if (queryResultTagQuery === undefined) {
            throw new Error("Execution failed:" + queryResultTagQuery);
        } else {
            return queryResultTagQuery;
        }
    }

    async deleteNeuesEssenById(tageid: number) {
       this.essenRepository.delete(tageid);
    }

    async deleteNeueSymptomeById(tageid: number) {
        this.symptomRepository.delete(tageid);
    }

    async deleteTagesformById(tageid: number) {
        this.tagesformRepository.delete(tageid);
    }

    async deleteAktivitaetenById(tageid: number) {
        this.aktivitaetRepository.delete(tageid);
    }

    async deleteDatabaseByName() {
        await deleteDatabase(this.db);
    }
}
