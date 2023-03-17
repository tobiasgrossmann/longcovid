import { Symptom } from "src/app/utils/interfaces";
import { TagBaseRepository } from "../base/TagBaseRepository";

export class SymptomRepository extends TagBaseRepository<Symptom>{
    constructor(_db: any) {
        super(_db, "symptome");
    }
}
