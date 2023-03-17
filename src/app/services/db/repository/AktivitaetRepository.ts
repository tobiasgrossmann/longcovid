import { Aktivitaet } from "src/app/utils/interfaces";
import { TagBaseRepository } from "../base/TagBaseRepository";

export class AktivitaetRepository extends TagBaseRepository<Aktivitaet>{
    constructor(_db: any) {
        super(_db, "aktivitaeten");
    }
}
