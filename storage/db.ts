// storage/db.ts
import { openDatabaseSync } from "expo-sqlite";

const db = openDatabaseSync("offline-med-aid.db");

export const initDB = async () => {
  await db.withTransactionSync(() => {
    db.execSync(
      `CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        diagnosis TEXT,
        treatment TEXT,
        date TEXT
      );`
    );
  });
};

export const insertPatient = async (
  name: string,
  age: number,
  gender: string,
  diagnosis: string,
  treatment: string,
  date: string
) => {
  await db.withTransactionSync(() => {
    db.runSync(
      `INSERT INTO patients (name, age, gender, diagnosis, treatment, date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, age, gender, diagnosis, treatment, date]
    );
  });
};

export const getPatients = (): any[] => {
  let rows: any[] = [];

  db.withTransactionSync(() => {
    const result = db.getAllSync(`SELECT * FROM patients`);
    rows = result ?? [];
  });

  return rows;
};
