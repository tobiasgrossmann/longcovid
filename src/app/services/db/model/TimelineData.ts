import { Aktivitaet } from "./Aktivitaet";
import { Essen } from "./essen";
import { Symptom } from "./Symptom";
import { Tag } from "./Tag";
import { Tagesform } from "./Tagesform";

export interface TimelineData {
    tage: Array<Tag>;
    essen: Array<Essen>;
    symptome: Array<Symptom>;
    tagesform: Array<Tagesform>;
    aktivitaeten: Array<Aktivitaet>;
}
