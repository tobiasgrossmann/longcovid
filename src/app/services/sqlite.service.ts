import { Injectable } from "@angular/core";

import { Capacitor } from "@capacitor/core";
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
    capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult,
    capNCDatabasePathResult } from "@capacitor-community/sqlite";

@Injectable()

export class SQLiteService {
    sqlite: SQLiteConnection;
    isService = false;
    platform: string;
    sqlitePlugin: any;
    native = false;

    constructor() {
    }
    /**
     * Plugin Initialization
     */
    initializePlugin(): Promise<boolean> {
        return new Promise (resolve => {
            this.platform = Capacitor.getPlatform();
            if(this.platform === "ios" || this.platform === "android") {this.native = true;}
            this.sqlitePlugin = CapacitorSQLite;
            this.sqlite = new SQLiteConnection(this.sqlitePlugin);
            this.isService = true;
            resolve(true);
        });
    }
    /**
     * Echo a value
     *
     * @param value
     */
    async echo(value: string): Promise<capEchoResult> {
        if(this.sqlite != null) {
            try {
                const ret = await this.sqlite.echo(value);
                return Promise.resolve(ret);
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }
    }


    /**
     * addUpgradeStatement
     *
     * @param database
     * @param fromVersion
     * @param toVersion
     * @param statement
     * @param set
     */
    async addUpgradeStatement(database: string, fromVersion: number,
                              toVersion: number, statement: string,
                              set?: capSQLiteSet[]): Promise<void> {
        if(this.sqlite != null) {
            try {
                await this.sqlite.addUpgradeStatement(database, fromVersion, toVersion,
                    statement, set ? set : []);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }


    /**
     * Create a connection to a database
     *
     * @param database
     * @param encrypted
     * @param mode
     * @param version
     */
    async createConnection(database: string, encrypted: boolean,
                           mode: string, version: number
    ): Promise<SQLiteDBConnection> {
        let db:SQLiteDBConnection = undefined;
        /*
            Bug on iPhone
            Connections is still open after a few hours, but still cant be retrieved. 
        */
        if(this.sqlite != null) {
            try {
               db = await this.sqlite.createConnection(database, encrypted, mode, version);
            } catch (ex) {
                try {
                    // we make sure the connection is closed
                    await this.sqlite.closeConnection(database);
                } catch (exx) {
                    //  silent fail, in that case we dont care if it was closed already
                }
                try {
                    db = await this.sqlite.createConnection(database, encrypted, mode, version);
                } catch (err) {
                    return Promise.reject(new Error(`no connection open for ${database} ${err}`));
                }
            } finally {
                return Promise.resolve(db);
            }
        } else {
            // if the instance is null
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }
    /**
     * Close a connection to a database
     *
     * @param database
     */
    async closeConnection(database: string): Promise<void> {
        if(this.sqlite != null) {
            try {
                await this.sqlite.closeConnection(database);
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }
    /**
     * Retrieve an existing connection to a database
     *
     * @param database
    */
    async retrieveConnection(database: string):
        Promise<SQLiteDBConnection> {
        if(this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.retrieveConnection(database));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error(`no connection open for ${database}`));
        }
    }
     


    /**
     * Check if connection exists
     *
     * @param database
     */
    async isConnection(database: string): Promise<capSQLiteResult> {
        if(this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.isConnection(database));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }
    }

    /**
     * Check if database exists
     *
     * @param database
     */
    async isDatabase(database: string): Promise<capSQLiteResult> {
        if(this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.isDatabase(database));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }
    }




    /**
     * Import from a Json Object
     *
     * @param jsonstring
     */
    async importFromJson(jsonstring: string): Promise<capSQLiteChanges> {
        if(this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.importFromJson(jsonstring));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }

    }

    /**
     * Is Json Object Valid
     *
     * @param jsonstring Check the validity of a given Json Object
     */
    async isJsonValid(jsonstring: string): Promise<capSQLiteResult> {
        if(this.sqlite != null) {
            try {
                return Promise.resolve(await this.sqlite.isJsonValid(jsonstring));
            } catch (err) {
                return Promise.reject(new Error(err));
            }
        } else {
            return Promise.reject(new Error("no connection open"));
        }

    }
}
