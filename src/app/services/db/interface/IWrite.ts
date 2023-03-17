export interface IWrite<T> {
    create(item: T, tableName?: string): Promise<boolean>;
    createOneEmpty(tageid: number, tableName?: string): Promise<any>;
    update(tageid: number, item: T, tableName?: string): Promise<any>;
    delete(tageid: number, tableName?: string): Promise<boolean>;
  }
