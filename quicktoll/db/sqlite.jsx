
//Hice la funcion sincrona, si da error volver a poner asincrono
export const createTables = async (db) => {
  return (
    db.execAsync(
     `
      CREATE TABLE IF NOT EXISTS percentage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        value INTEGER NOT NULL,
        date TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS habits(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now')),
        goal INTEGER NOT NULL,
        goal_unit TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS habit_completions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        habit_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        progress INTEGER DEFAULT 0,
        FOREIGN KEY(habit_id) REFERENCES habits(id)
      );
    `)
  );
};