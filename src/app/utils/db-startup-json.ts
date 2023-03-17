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
                {
                    foreignkey: "tageid",
                    value: "REFERENCES tage(id) ON DELETE SET DEFAULT"
                }
            ],
            values: []
        }
    ]
};

export const patientStrengthStartupSchema: string = `
CREATE TABLE tage (
  id INTEGER PRIMARY KEY NOT NULL,
  date TEXT,
  last_modified TEXT DEFAULT (datetime('now', 'localtime'))
);
CREATE TABLE symptome (
  id INTEGER PRIMARY KEY NOT NULL,
  tageid INTEGER,
  symptom_names_checkboxes TEXT,
  symptom_names TEXT,
  husten_value INTEGER,
  fieber_value INTEGER,
  fatigue_value INTEGER,
  kurzatmigkeit_value INTEGER,
  brustschmerzen_value INTEGER,
  kopfschmerzen_value INTEGER,
  geschmacksverlust_value INTEGER,
  neurologische_stoerung_value INTEGER,
  muskelschmerzen_value INTEGER,
  hautausschlag_value INTEGER,
  missempfindungen_value INTEGER,
  schwindel_value INTEGER,
  gedaechtniseinschraenkungen_value INTEGER,
  leseeinschraenkungen_value INTEGER,
  last_modified TEXT DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (tageid) REFERENCES tage(id) ON DELETE SET DEFAULT
);
CREATE TABLE essen (
  id INTEGER PRIMARY KEY NOT NULL,
  tageid INTEGER,
  vormittag TEXT,
  mittag TEXT,
  abend TEXT,
  medikamente_value TEXT,
  last_modified TEXT DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (tageid) REFERENCES tage(id) ON DELETE SET DEFAULT
);
CREATE TABLE tagesform (
  id INTEGER PRIMARY KEY NOT NULL,
  tageid INTEGER,
  tagesform_value INTEGER,
  erschoepfungsart_value INTEGER,
  schlaf_value INTEGER,
  stimmung_value INTEGER,
  last_modified TEXT DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (tageid) REFERENCES tage(id) ON DELETE SET DEFAULT
);
CREATE TABLE aktivitaeten (
  id INTEGER PRIMARY KEY NOT NULL,
  tageid INTEGER,
  aktivitaeten_names_checkboxes TEXT,
  aktivitaeten_names TEXT,
  sport_value INTEGER,
  arbeit_value INTEGER,
  hausarbeit_value INTEGER,
  entspannung_value INTEGER,
  last_modified TEXT DEFAULT (datetime('now', 'localtime')),
  FOREIGN KEY (tageid) REFERENCES tage(id) ON DELETE SET DEFAULT
);
CREATE INDEX tage_index_last_modified ON symptome (last_modified);
CREATE INDEX symptome_index_last_modified ON symptome (last_modified);
CREATE INDEX essen_index_last_modified ON essen (last_modified);
CREATE INDEX tagesform_index_last_modified ON tagesform (last_modified);
CREATE INDEX aktivitaeten_index_last_modified ON aktivitaeten (last_modified);
CREATE TRIGGER tage_index_last_modified
AFTER UPDATE ON tage
FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
BEGIN
    UPDATE tage SET last_modified= (datetime('now', 'localtime')) WHERE id=OLD.id;
END;
CREATE TRIGGER symptome_index_last_modified
AFTER UPDATE ON symptome
FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
BEGIN
    UPDATE symptome SET last_modified= (datetime('now', 'localtime')) WHERE id=OLD.id;
END;
CREATE TRIGGER essen_trigger_last_modified
AFTER UPDATE ON essen
FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
BEGIN
    UPDATE essen SET last_modified= (datetime('now', 'localtime')) WHERE id=OLD.id;
END;
CREATE TRIGGER tagesform_trigger_last_modified
AFTER UPDATE ON tagesform
FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
BEGIN
    UPDATE tagesform SET last_modified= (datetime('now', 'localtime')) WHERE id=OLD.id;
END;
CREATE TRIGGER aktivitaeten_trigger_last_modified
AFTER UPDATE ON aktivitaeten
FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified
BEGIN
    UPDATE aktivitaeten SET last_modified= (datetime('now', 'localtime')) WHERE id=OLD.id;
END;
`;

