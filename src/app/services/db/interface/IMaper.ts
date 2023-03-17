export interface IMaper<T> {
    mapObjectToEntity(object: any): T;
    mapEntityToObject(entity: T): any;
    mapObjectToUpdateStatement(object: any): string;
}
