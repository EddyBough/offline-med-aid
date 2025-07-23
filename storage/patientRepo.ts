// crud of patient
import { db } from "./db";

export const PatientRepo = {
  // Get all patients
  getAll: (): any[] => {
    let rows: any[] = [];
    db.withTransactionSync(() => {
      const result = db.getAllSync(`SELECT * FROM patients`);
      rows = result ?? [];
    });
    return rows;
  },

  // add patient
  create: (
    name: string,
    age: number,
    gender: string,
    diagnosis: string,
    treatment: string,
    date: string
  ) => {
    db.withTransactionSync(() => {
      db.runSync(
        `INSERT INTO patients (name, age, gender, diagnosis, treatment, date)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, age, gender, diagnosis, treatment, date]
      );
    });
  },

  // update patient info
  update: (
    id: number,
    name: string,
    age: number,
    gender: string,
    diagnosis: string,
    treatment: string,
    date: string
  ) => {
    db.withTransactionSync(() => {
      db.runSync(
        `UPDATE patients
         SET name = ?, age = ?, gender = ?, diagnosis = ?, treatment = ?, date = ?
         WHERE id = ?`,
        [name, age, gender, diagnosis, treatment, date, id]
      );
    });
  },

  // delete patient
  delete: (id: number) => {
    db.withTransactionSync(() => {
      db.runSync(`DELETE FROM patients WHERE id = ?`, [id]);
    });
  },
};
