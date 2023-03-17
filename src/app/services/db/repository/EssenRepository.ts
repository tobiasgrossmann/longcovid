import { Essen } from "src/app/utils/interfaces";
import { TagBaseRepository } from "../base/TagBaseRepository";

export class EssenRepository extends TagBaseRepository<Essen>{
    constructor(_db: any) {
        super(_db, "essen");
    }
}
