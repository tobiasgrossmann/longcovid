import { IWrite } from "../interface/IWrite";
import { IRead } from "../interface/IRead";
import { IMaper } from "../interface/IMaper";
import { camelCaseToSnakeCase, snakeCaseToCamelCase } from "../utils/mappers";

export abstract class TagBaseRepository<T> implements IWrite<T>, IRead<T>, IMaper<T> {
  db: any;
  tableName: string;
  constructor(_db: any, _tableName?: string) {
      this.db = _db;
      if(_tableName) {
        this.tableName = _tableName;
      }
  }

  //IWrite
  async create(item: T, tableName?: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async createOneEmpty(tageid: number, tableName?: string){
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `INSERT OR IGNORE INTO ${this.tableName} (tageid) VALUES (${tageid});`;
    const queryResult = await this.db.execute(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Execution failed:" + queryResult);
    } else {
        return queryResult;
    }
  }

  async update(tageid: number, item: T, tableName?: string) {
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `UPDATE ${this.tableName} SET ${this.mapObjectToUpdateStatement(item)} WHERE tageid = ${tageid};`;
      const queryResult = await this.db.execute(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Execution failed:" + queryStatement);
      } else {
          return queryResult;
      }
  }

  async delete(tageid: number, tableName?: string): Promise<boolean> {
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `DELETE FROM ${this.tableName} WHERE tageid = '${tageid}';`;
    const queryResult = await this.db.execute(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Execution failed:" + queryResult);
    } else {
        return queryResult;
    }
  }
  //IRead
  async findAll(tableName?: string): Promise<Array<T>> {
    const t0 = performance.now();
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `SELECT * FROM ${this.tableName};`;
    const queryResult = await this.db.query(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Query failed:" + queryStatement);
    } else {
        const t1 = performance.now();
        console.log("Query took " + (t1 - t0) + " milliseconds.");
        return queryResult.values.map(row => this.mapObjectToEntity(row));
    }
  }

  async findAllInRange(days, tableName?: string): Promise<Array<T>> {
    const t0 = performance.now();
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `SELECT * FROM ${this.tableName} WHERE tageid IN (${days.join(",")});`;
    const queryResult = await this.db.query(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Query failed:" + queryStatement);
    } else {
        const t1 = performance.now();
        console.log("Query took " + (t1 - t0) + " milliseconds.");
        return queryResult.values.map(row => this.mapObjectToEntity(row));
    }
  }

  async findOne(tageid: number, tableName?: string): Promise<any> {
    if(tableName) {
      this.tableName = tableName;
    }
    const queryStatement = `SELECT * FROM ${this.tableName} WHERE ${this.tableName}.tageid = ${tageid};`;
      const queryResult = await this.db.query(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Execution failed:" + queryStatement);
      } else {
          // for future use when we change the rest of app
          // return this.mapObjectToEntity(queryResult.values[0]);
          // for now we use this to not break the rest of app
          return {
            values: queryResult.values.map(row => this.mapObjectToEntity(row)),
          };
      }
  }

  //IMaper
  mapObjectToEntity(object: any): T {
    const entity = {} as T;
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            entity[snakeCaseToCamelCase(key)] = element;
        }
    }
    return entity;
  }

  mapEntityToObject(entity: T): any {
    const object = {} as any;
    for (const key in entity) {
        if (entity.hasOwnProperty(key)) {
            const element = entity[key];
            object[camelCaseToSnakeCase(key)] = element;
        }
    }
    return object;
  }

  mapObjectToUpdateStatement(object: any): string {
    let updateStatement = "";
    for (const key in object) {
      if(key === "id" || key === "tageid") {
        continue;
      }
      if (object.hasOwnProperty(key)) {
          const element = object[key];
          updateStatement += `${camelCaseToSnakeCase(key)} = '${element}', `;
      }
      else if(key === "lastModified") {
        const nowTimestamp = new Date().toISOString().split(".")[0];
        updateStatement += `${key} = '${nowTimestamp}'`;
      }
    }
    return updateStatement.substring(0, updateStatement.length - 2);
  }

  //Utils
  async countAll(tableName?: string): Promise<number> {
    const queryStatement = `SELECT COUNT(*) AS count FROM ${this.tableName};`;
    const queryResult = await this.db.query(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Query failed:" + queryStatement);
    }
    else {
        return queryResult;
    }
  }
}
