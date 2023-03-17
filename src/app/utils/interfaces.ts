export interface Tag {
    id: number;
    date: string;
    last_modified: string;
}

export interface Symptom {
    id: number;
    tageid: number;
    symptomNames?: string;
    symptomNamesCheckboxes?: string;
    brustschmerzenValue?: number;
    fatigueValue?: number;
    fieberValue?: number;
    gedaechtniseinschraenkungenValue?: number;
    geschmacksverlustValue?: number;
    hautausschlagValue?: number;
    hustenValue?: number;
    kopfschmerzenValue?: number;
    kurzatmigkeitValue?: number;
    leseeinschraenkungenValue?: number;
    missempfindungenValue?: number;
    muskelschmerzenValue?: number;
    neurologischeStoerungValue?: number;
    schwindelValue?: number;
    lastModified?: string;

}

export interface Essen {
    id: number;
    tageid: number;
    vormittag?: string;
    mittag?: string;
    abend?: string;
    medikamenteValue?: string;
    lastModified?: string;
}

export interface Tagesform {
    id: number;
    tageid: number;
    tagesformValue?: number;
    erschoepfungsartValue?: number;
    schlafValue?: number;
    stimmungValue?: number;
    lastModified?: string;
}

export interface TimelineData {
    tage: Array<Tag>;
    essen: Array<Essen>;
    symptome: Array<Symptom>;
    tagesform: Array<Tagesform>;
    aktivitaeten: Array<Aktivitaet>
}

export interface Language {
    id: number;
    name: string;
    short: string;
}

export interface Country {
  name: string;
  alpha2code: string;
}

export interface Backup {
    name: string;
}

export interface Aktivitaet {
    id: number;
    tageid: number;
    sportValue?: number;
    arbeitValue?: number;
    hausarbeitValue?: number;
    entspannungValue?: number;
    aktivitaetenNamesCheckboxes?: string;
    aktivitaetenNames?: string;
    lastModified?: string;
}
