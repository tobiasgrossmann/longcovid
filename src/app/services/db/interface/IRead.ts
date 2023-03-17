export interface IRead<T> {
    findAll(tableName?: string): Promise<T[]>;
    findOne(id: number, tableName?: string): Promise<T>;
    countAll(tableName?: string): Promise<number>;
}
