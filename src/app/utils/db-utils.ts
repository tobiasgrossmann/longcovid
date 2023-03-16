import {SQLiteDBConnection} from "@capacitor-community/sqlite";

export async function deleteDatabase(db: SQLiteDBConnection): Promise<void> {
    try {
        const ret: any = await db.isExists();
        if (ret.result) {
            const dbName = db.getConnectionDBName();
            console.log("$$$ database " + dbName + " before delete");
            await db.delete();
            console.log("$$$ database " + dbName + " after delete ");
            return Promise.resolve();
        } else {
            return Promise.resolve();
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export async function checkIfDBExists(db: SQLiteDBConnection): Promise<boolean> {
    try {
        const ret: any = await db.isExists();
        if (ret.result) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

