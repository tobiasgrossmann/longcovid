import { Aktivitaet } from "./Aktivitaet";
import { Essen } from "./essen";
import { Symptom } from "./Symptom";
import { Tagesform } from "./Tagesform";

export interface Day {
    id: number;
    date: string;
    lastModified: string;
    essen: Essen;
    symptom: Symptom;
    tagesform: Tagesform;
    aktivitaet: Aktivitaet;
}
