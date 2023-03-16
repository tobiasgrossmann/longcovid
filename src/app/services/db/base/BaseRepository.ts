import { IWrite } from "../interface/IWrite";
import { IRead } from "../interface/IRead";
import { IMaper } from "../interface/IMaper";
import { camelCaseToSnakeCase, snakeCaseToCamelCase } from "../utils/mappers";

export abstract class BaseRepository<T>  {
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

  async update(id: number, item: T, tableName?: string): Promise<boolean> {
    const queryStatement = `UPDATE ${this.tableName} SET ${this.mapObjectToUpdateStatement(item)} WHERE id = ${id};`;
    const queryResult = await this.db.query(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Query failed:" + queryStatement);
    }
    return queryResult;
  }

  async delete(id: number, tableName?: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  //IRead
  async findAll(tableName?: string): Promise<T[]> {
    const queryStatement = `SELECT * FROM ${this.tableName};`;
    const queryResult = await this.db.query(queryStatement);
    if (queryResult === undefined) {
        throw new Error("Query failed:" + queryStatement);
    } else {
        return queryResult.values.map(row => this.mapObjectToEntity(row));
    }
  }

  async findOne(id: number, tableName?: string): Promise<T> {
    throw new Error("Method not implemented.");
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
      if(key === "id"){
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
    } else {
        return queryResult;
    }
  }
}
