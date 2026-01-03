export const createTables = async (db) => {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS profiles (
      id TEXT PRIMARY KEY,
      full_name TEXT,
      email TEXT UNIQUE,
      phone TEXT,
      city TEXT,
      state TEXT,
      status INTEGER DEFAULT 1,
      in_trip INTEGER DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    );

    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY,
      profiles_id TEXT,
      owner TEXT,
      name TEXT,
      license_plate TEXT,
      color TEXT,
      type TEXT,
      created_at TEXT,
      updated_at TEXT,
      year INTEGER,
      active INTEGER DEFAULT 1,
      FOREIGN KEY (profiles_id) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS cards (
      id INTEGER PRIMARY KEY,
      profiles_id TEXT,
      name TEXT,
      last_digits TEXT,
      created_at TEXT,
      updated_at TEXT,
      active INTEGER DEFAULT 1,
      FOREIGN KEY (profiles_id) REFERENCES profiles(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS tolls (
      id INTEGER PRIMARY KEY,
      name TEXT,
      state TEXT,
      created_at TEXT,
      updated_at TEXT,
      active INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS rates (
      id INTEGER PRIMARY KEY,
      tolls_id INTEGER,
      vehicle_type TEXT,
      amount REAL,
      created_at TEXT,
      updated_at TEXT,
      FOREIGN KEY (tolls_id) REFERENCES tolls(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      profiles_id TEXT,
      vehicles_id INTEGER,
      tolls_id INTEGER,
      cards_id INTEGER,
      payment_type TEXT,
      created_at TEXT,
      rates_id INTEGER,
      FOREIGN KEY (profiles_id) REFERENCES profiles(id),
      FOREIGN KEY (vehicles_id) REFERENCES vehicles(id),
      FOREIGN KEY (tolls_id) REFERENCES tolls(id),
      FOREIGN KEY (cards_id) REFERENCES cards(id),
      FOREIGN KEY (rates_id) REFERENCES rates(id)
    );

    CREATE TABLE IF NOT EXISTS sync_meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );

  `);
};

//Funciones para perfil
export const getProfile = async (db) => {
  return await db.getFirstAsync(`SELECT * FROM profiles LIMIT 1`);
};

export const upsertProfile = async (db, profiles) => {
  const {
    id,
    full_name,
    email,
    phone,
    city,
    state,
    status,
    in_trip,
    created_at,
    updated_at,
  } = profiles;

  await db.runAsync(
    `
      INSERT INTO profiles (
        id,
        full_name,
        email,
        phone,
        city,
        state,
        status,
        in_trip,
        created_at,
        updated_at
      )
      VALUES (?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET
        full_name  = excluded.full_name,
        email      = excluded.email,
        phone      = excluded.phone,
        city       = excluded.city,
        state      = excluded.state,
        status     = excluded.status,
        in_trip    = excluded.in_trip,
        updated_at = excluded.updated_at
      WHERE excluded.updated_at > profiles.updated_at;
     `,
    [
      id,
      full_name,
      email,
      phone,
      city,
      state,
      status? 1 : 0,
      in_trip? 1 : 0,
      created_at,
      updated_at,
    ]
  );
};


//Funciones para los vehiculos
//Esta hecho sin necesitar id del usuario, esto por que todo lo que tenemos aqui nos pertenece
//gracias a las rls puestas en supabase
export const getVehicles = async (db) => {
  return await db.getAllAsync(`SELECT * FROM vehicles WHERE active = 1`)
};

export const getVehicleById = async(db,vehicleId) => {
  return await db.getFirstAsync(`SELECT * FROM vehicles WHERE id=?`,
    [vehicleId]
  );
};

export const getActiveVehicleCount = async (db) => {
  const row = await db.getFirstAsync(
    `SELECT COUNT(*) AS count
     FROM vehicles
     WHERE active = 1`
  );

  return row.count;
};


export const upsertVehicle = async (db, vehicle) => {
  const {
    id,
    profiles_id,
    owner,
    name,
    license_plate,
    color,
    type,
    created_at,
    updated_at,
    year,
    active
  } = vehicle;

  await db.runAsync(
    `
      INSERT INTO vehicles (
        id,
        profiles_id,
        owner,
        name,
        license_plate,
        color,
        type,
        created_at,
        updated_at,
        year,
        active
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET
        owner = excluded.owner,
        name = excluded.name,
        license_plate = excluded.license_plate,
        color = excluded.color,
        type = excluded.type,
        updated_at = excluded.updated_at,
        year = excluded.year,
        active = excluded.active
      WHERE excluded.updated_at > vehicles.updated_at;
    `,
    [
      id,
      profiles_id,
      owner,
      name,
      license_plate,
      color,
      type,
      created_at,
      updated_at,
      year,
      active
    ]
  );
};

export const deleteVehicleById = async(db,vehicleId) => {
  await db.runAsync(`DELETE FROM vehicles WHERE id=?`,
    [vehicleId]
  );
};



//Funciones para las tarjetas
export const getCards = async (db) => {
  return await db.getAllAsync(`SELECT * FROM cards WHERE active=1`);
};

export const upsertCard = async (db,card) => {
  const {
    id,
    profiles_id,
    name,
    last_digits,
    created_at,
    updated_at,
    active
  } = card;

  await db.runAsync(
    `
      INSERT INTO cards (
        id,
        profiles_id,
        name,
        last_digits,
        created_at,
        updated_at,
        active
      )
      VALUES (?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        last_digits = excluded.last_digits,
        updated_at = excluded.updated_at,
        active = excluded.active
      WHERE excluded.updated_at > cards.updated_at;
    `,
    [
      id,
      profiles_id,
      name,
      last_digits,
      created_at,
      updated_at,
      active
    ]
  );
};

export const deleteCardById = async (db,cardId) => {
  await db.runAsync(`DELETE FROM cards WHERE id=?`,
    [cardId]
  );
};



//Funciones para las casetas
export const getAllTolls = async (db) => {
  return await db.getAllAsync(`SELECT * FROM tolls`);
};

export const upsertToll = async (db,toll) => {
  const {
    id,
    name,
    state,
    created_at,
    updated_at,
    active
  } = toll;

  await db.runAsync(
    `
    INSERT INTO tolls (
      id,
      name,
      state,
      created_at,
      updated_at,
      active
    ) 
    VALUES (?,?,?,?,?,?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      state = excluded.state,
      updated_at = excluded.updated_at,
      active = excluded.active
    WHERE excluded.updated_at > tolls.updated_at;
    `,
    [
      id,
      name,
      state,
      created_at,
      updated_at,
      active
    ]
  );
};


//Funciones para las tarifas
export const getRatesByTollId = async (db,tollId) => {
  return await db.getAllAsync(`SELECT * FROM rates WHERE tolls_id=?`,
    [tollId]
  );
};

export const upsertRate = async (db,rate) => {
  const {
    id,
    tolls_id,
    vehicle_type,
    amount,
    created_at,
    updated_at,
  } = rate;

  await db.runAsync(
    `
    INSERT INTO rates (
      id,
      tolls_id,
      vehicle_type,
      amount,
      created_at,
      updated_at
    ) 
    VALUES (?,?,?,?,?,?)
    ON CONFLICT(id) DO UPDATE SET
      vehicle_type = excluded.vehicle_type,
      amount = excluded.amount,
      updated_at = excluded.updated_at
    WHERE excluded.updated_at > rates.updated_at;
    `,
    [
      id,
      tolls_id,
      vehicle_type,
      amount,
      created_at,
      updated_at,
    ]
  );
};


export const getTransactions = async (db) => {
  return await db.getAllAsync(`SELECT * FROM transactions`);
};

export const getLastTransactions = async (db, limit) => {
  return await db.getAllAsync(
    `SELECT * FROM transactions
     ORDER BY created_at DESC
     LIMIT ?`,
    [limit]
  );
};

export const getTransactionCount = async (db) => {
  const result = await db.getFirstAsync(
    `SELECT COUNT(*) as count FROM transactions`
  );

  return result.count;
};


export const upsertTransaction = async (db,transaction) => {
  const {
    id,
    profiles_id,
    vehicles_id,
    tolls_id,
    cards_id,
    payment_type,
    created_at,
    rates_id
  } = transaction;

  await db.runAsync(
    `
      INSERT OR IGNORE INTO transactions (
        id,
        profiles_id,
        vehicles_id,
        tolls_id,
        cards_id,
        payment_type,
        rates_id,
        created_at
      )
      VALUES (?,?,?,?,?,?,?,?);
    `,
    [
      id,
      profiles_id,
      vehicles_id,
      tolls_id,
      cards_id,
      payment_type,
      created_at,
      rates_id
    ]
  );
};

export const clearAllLocalData = async (db) => {
  await db.execAsync(`
    DELETE FROM transactions;
    DELETE FROM rates;
    DELETE FROM cards;
    DELETE FROM vehicles;
    DELETE FROM tolls;
    DELETE FROM profiles;
    DELETE FROM sync_meta;
  `);
};


export const getLastSync = async (db, key) => {
  const row = await db.getFirstAsync(
    `SELECT value FROM sync_meta WHERE key =?`,
    [key]
  );

  return row?.value?? '1970-01-01T00:00:00.000Z';
};

export const setLastSync = async (db, key, value) => {
  await db.runAsync(
    `INSERT OR REPLACE INTO sync_meta (key, value) VALUES (?,?)`,
    [key, value]
  );
};



export const syncProfileFromSupabase = async (db,supabase,userId) => {
  //const lastSync = await getLastSync(db, 'profile_updated');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;

  if (data) {
    await upsertProfile(db, data);
  }
};

export const syncVehiclesFromSupabase = async (db,supabase) => {
  const lastSync = await getLastSync(db, 'vehicle_updated');

  const { data,error } = await supabase
    .from('vehicles')
    .select('*')
    .gt('updated_at', lastSync)
    .order('updated_at', { ascending: true });
  if (error) throw error;

  for (const vehicle of data) {
    await upsertVehicle(db, vehicle);
  }

  if (data.length > 0) {
    const newest = data[data.length - 1].updated_at;
    await setLastSync(db, 'vehicle_updated', newest);
  }
};

export const syncCardsFromSupabase = async (db,supabase) => {
  const lastSync = await getLastSync(db, 'card_updated');

  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .gt('updated_at', lastSync)
    .order('updated_at', { ascending: true });
  if (error) throw error;

  for (const card of data) {
    await upsertCard(db, card);
  }
  
  if (data.length > 0) {
    const newest = data[data.length - 1].updated_at;
    await setLastSync(db, 'card_updated', newest);
  }
};

export const syncTransactionsFromSupabase = async (db, supabase) => {
  const lastSync = await getLastSync(db, 'transaction_created');

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .gt('created_at', lastSync)
    .order('created_at', { ascending: true });
  if (error) throw error;

  for (const tx of data) {
    await upsertTransaction(db, tx);
  }

  if (data.length > 0) {
    await setLastSync(db, 'transaction_created', data[data.length - 1].created_at);
  }
};

export const syncTollsFromSupabase = async (db, supabase) => {
  const lastSync = await getLastSync(db, 'tolls_updated_at');

  const { data, error } = await supabase
    .from('tolls')
    .select('*')
    .gt('updated_at', lastSync)
    .order('updated_at', { ascending: true });
  if (error) throw error;

  for (const toll of data) {
    await upsertToll(db, toll);
  }

  if (data.length > 0) {
    await setLastSync(db,'tolls_updated_at',
      data[data.length - 1].updated_at
    );
  }
};
