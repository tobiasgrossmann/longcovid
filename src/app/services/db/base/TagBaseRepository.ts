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
    console.error("Method not implemented.");
    throw new Error("Method not implemented.");
  }

  async createOneEmpty(tageid: number, tableName?: string){
    let queryResult = {values:[]};
    try {
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `INSERT OR IGNORE INTO ${this.tableName} (tageid) VALUES (${tageid});`;
      queryResult = await this.db.execute(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Execution failed:" + queryResult);
      } 
    } catch (error) {
      console.error("TagBaseRepository DB CREATE", error);
    } finally {
      return queryResult;
    }    
  }

  async update(tageid: number, item: T, tableName?: string) {
    let queryResult = {values:[]};
    try {
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `UPDATE ${this.tableName} SET ${this.mapObjectToUpdateStatement(item)} WHERE tageid = ${tageid};`;
        queryResult = await this.db.execute(queryStatement);
        if (queryResult === undefined) {
            throw new Error("Execution failed:" + queryStatement);
        } else {
            return queryResult;
        }
    } catch (error) {
      console.error("TagBaseRepository DB UPDATE", error);
    } finally {
      return queryResult;
    }    
  }

  async delete(tageid: number, tableName?: string): Promise<boolean> {
    let queryResult = {values:[]};
    let serviceResult = false;
    try {
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `DELETE FROM ${this.tableName} WHERE tageid = '${tageid}';`;
      queryResult = await this.db.execute(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Execution failed:" + queryResult);
      } 
      serviceResult = true;
    } catch (error) {
      console.error("TagBaseRepository DB DELETE", error);
      serviceResult = false;
    } finally {
      return serviceResult;
    }  
  }


  //IRead
  async findAll(tableName?: string): Promise<Array<T>> {
    let queryResult = {values:[]};
    try {
      const t0 = performance.now();
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `SELECT * FROM ${this.tableName};`;
      queryResult = await this.db.query(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Query failed:" + queryStatement);
      } 
    } catch (error) {
      console.error("TagBaseRepository DB findAll", error);
    }
    finally {
      const t1 = performance.now();
      return queryResult.values.map(row => this.mapObjectToEntity(row));
    }
  }

  async findAllInRange(days, tableName?: string): Promise<Array<T>> {
    let queryResult = {values:[]};
    try {
      const t0 = performance.now();
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `SELECT * FROM ${this.tableName} WHERE tageid IN (${days.join(",")});`;
      queryResult = await this.db.query(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Query failed:" + queryStatement);
      }
    } catch (error) {
      console.error("TagBaseRepository DB findAllInRange", error);
    }
    finally {
      const t1 = performance.now();
      return queryResult.values.map(row => this.mapObjectToEntity(row));
    }
  }

  async findOne(tageid: number, tableName?: string): Promise<any> {
    let queryResult = {values:[]};
    try {
      if(tableName) {
        this.tableName = tableName;
      }
      const queryStatement = `SELECT * FROM ${this.tableName} WHERE ${this.tableName}.tageid = ${tageid};`;
      queryResult = await this.db.query(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Execution failed:" + queryStatement);
      }
    } catch (error) {
      console.error("TagBaseRepository DB findOne", error);
    }
    finally {
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
    try {
      for (const key in object) {
          if (object.hasOwnProperty(key)) {
              const element = object[key];
              entity[snakeCaseToCamelCase(key)] = element;
          }
      }
    } catch (error) {
      console.error("TagBaseRepository DB mapObjectToEntity", error);
    }
    finally {
      return entity;  
    }
  }

  mapEntityToObject(entity: T): any {
    const object = {} as any;
    try {
      for (const key in entity) {
          if (entity.hasOwnProperty(key)) {
              const element = entity[key];
              object[camelCaseToSnakeCase(key)] = element;
          }
      }
    } catch (error) {
      console.error("TagBaseRepository DB mapEntityToObject", error);
    } finally {
      return object;
    }
  }

  mapObjectToUpdateStatement(object: any): string {
    let updateStatement = "";
    try {
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
    } catch (error) {
      console.error("TagBaseRepository DB mapObjectToUpdateStatement", error);
    }
    finally {
      return updateStatement.substring(0, updateStatement.length - 2);      
    }
  }

  //Utils
  /*
  async countAll(tableName?: string): Promise<number> {
    let queryResult = {values:[]};
    try {
      const queryStatement = `SELECT COUNT(*) AS count FROM ${this.tableName};`;
      queryResult = await this.db.query(queryStatement);
      if (queryResult === undefined) {
          throw new Error("Query failed:" + queryStatement);
      }
    } catch (error) {

    } finally {
      return queryResult;
    }

  }
  */
}
