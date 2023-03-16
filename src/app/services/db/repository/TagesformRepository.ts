import { Tagesform } from "src/app/utils/interfaces";
import { TagBaseRepository } from "../base/TagBaseRepository";

export class TagesformRepository extends TagBaseRepository<Tagesform>{
    constructor(_db: any) {
        super(_db, "tagesform");
    }
}
