export const patientStrengthStartupData: any = {
    database: "patient-strength-db",
    version: 1,
    encrypted: false,
    mode: "full",
    tables: [
        {
            name: "tage",
            schema: [
                {column: "id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column: "date", value: "TEXT"},
                {column: "last_modified", value: "TEXT DEFAULT (datetime('now', 'localtime'))"},
                {column: "sql_deleted", value: "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"},
            ],
            values: []
        },
        {
            name: "symptome",
            schema: [
                {column: "id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column: "tageid", value: "INTEGER"},
                {column: "symptom_names_checkboxes", value: "TEXT"},
                {column: "symptom_names", value: "TEXT"},
                {column: "husten_value", value: "INTEGER"},
                {column: "fieber_value", value: "INTEGER"},
                {column: "fatigue_value", value: "INTEGER"},
                {column: "kurzatmigkeit_value", value: "INTEGER"},
                {column: "brustschmerzen_value", value: "INTEGER"},
                {column: "kopfschmerzen_value", value: "INTEGER"},
                {column: "geschmacksverlust_value", value: "INTEGER"},
                {column: "neurologische_stoerung_value", value: "INTEGER"},
                {column: "muskelschmerzen_value", value: "INTEGER"},
                {column: "hautausschlag_value", value: "INTEGER"},
                {column: "missempfindungen_value", value: "INTEGER"},
                {column: "schwindel_value", value: "INTEGER"},
                {column: "gedaechtniseinschraenkungen_value", value: "INTEGER"},
                {column: "leseeinschraenkungen_value", value: "INTEGER"},
                {column: "last_modified", value: "TEXT DEFAULT (datetime('now', 'localtime'))"},
                {column: "sql_deleted", value: "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"},
                {
                    foreignkey: "tageid",
                    value: "REFERENCES tage(id) ON DELETE SET DEFAULT"
                }
            ],
            values: []
        },
        {
            name: "essen",
            schema: [
                {column: "id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column: "tageid", value: "INTEGER"},
                {column: "vormittag", value: "TEXT"},
                {column: "mittag", value: "TEXT"},
                {column: "abend", value: "TEXT"},
                {column: "medikamente_value", value: "TEXT"},
                {column: "last_modified", value: "TEXT DEFAULT (datetime('now', 'localtime'))"},
                {column: "sql_deleted", value: "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"},
                {
                    foreignkey: "tageid",
                    value: "REFERENCES tage(id) ON DELETE SET DEFAULT"
                }
            ],
            values: []
        },
        {
            name: "tagesform",
            schema: [
                {column: "id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column: "tageid", value: "INTEGER"},
                {column: "tagesform_value", value: "INTEGER"},
                {column: "erschoepfungsart_value", value: "INTEGER"},
                {column: "schlaf_value", value: "INTEGER"},
                {column: "stimmung_value", value: "INTEGER"},
                {column: "last_modified", value: "TEXT DEFAULT (datetime('now', 'localtime'))"},
                {column: "sql_deleted", value: "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"},
                {
                    foreignkey: "tageid",
                    value: "REFERENCES tage(id) ON DELETE SET DEFAULT"
                }
            ],
            values: []
        },
        {
            name: "aktivitaeten",
            schema: [
                {column: "id", value: "INTEGER PRIMARY KEY NOT NULL"},
                {column: "tageid", value: "INTEGER"},
                {column: "aktivitaeten_names_checkboxes", value: "TEXT"},
                {column: "aktivitaeten_names", value: "TEXT"},
                {column: "sport_value", value: "INTEGER"},
                {column: "arbeit_value", value: "INTEGER"},
                {column: "hausarbeit_value", value: "INTEGER"},
                {column: "entspannung_value", value: "INTEGER"},
                {column: "last_modified", value: "TEXT DEFAULT (datetime('now', 'localtime'))"},
                {column: "sql_deleted", value: "BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1))"},
                {
                    foreignkey: "tageid",
                    value: "REFERENCES tage(id) ON DELETE SET DEFAULT"
                }
            ],
            values: []
        }
    ]
};


export const dbUpgrades: any[] = [
    {
      toVersion: 1, 
      statements: [
        `IF  COL_LENGTH('aktivitaeten', 'sql_deleted') IS NULL BEGIN ALTER TABLE aktivitaeten ADD COLUMN sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)); END`,
        `IF  COL_LENGTH('tagesform', 'sql_deleted') IS NULL BEGIN ALTER TABLE tagesform ADD COLUMN sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)); END`,
        `IF  COL_LENGTH('essen', 'sql_deleted') IS NULL BEGIN ALTER TABLE essen ADD COLUMN sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)); END`,
        `IF  COL_LENGTH('symptome', 'sql_deleted') IS NULL BEGIN ALTER TABLE symptome ADD COLUMN sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)); END`,
        `IF  COL_LENGTH('tage', 'sql_deleted') IS NULL BEGIN ALTER TABLE tage ADD COLUMN sql_deleted BOOLEAN DEFAULT 0 CHECK (sql_deleted IN (0, 1)); END`,
      ]
    },

  ]

export const currentDbVersion:number = dbUpgrades[dbUpgrades.length -1].toVersion;
