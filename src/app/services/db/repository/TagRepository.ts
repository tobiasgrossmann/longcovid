import { TagBaseRepository } from "../base/TagBaseRepository";
import { Tag } from "../model/Tag";

export class TagRepository extends TagBaseRepository<Tag>{
    constructor(_db: any) {
        super(_db, "tage");
    }
}
