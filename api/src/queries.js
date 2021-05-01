var dbcon = require("./config/db");
exports.saveNewData = async function saveNewData(data, place_id, uuid) {
  const insertId = await insertDataEntry(uuid, place_id).catch((err) => err);
  return insertLogData(insertId, data);
};

async function insertDataEntry(uuid, place_id) {
  return new Promise((resolve, reject) => {
    const insertEntry =
      "INSERT INTO DATA_ENTRIES (uuid, placeId) VALUES (?,?);";
    dbcon.query(insertEntry, [uuid, place_id], function (err, result) {
      if (err) reject(err);
      resolve(result.insertId);
    });
  });
}

async function insertLogData(insertId, data) {
  return Promise.all([
    insertGyro(data.gyroscope, insertId),
    insertAccel(data.accelerometer, insertId),
    insertMagn(data.magnetometer, insertId),
    insertBaro(data.barometer, insertId),
  ]);
}
async function insertGyro(data, insertId) {
  return new Promise((resolve, reject) => {
    const insertEntry =
      "INSERT INTO GYRO (entryId, x, y, z, tsamp) VALUES (?,?,?,?,?);";
    dbcon.query(
      insertEntry,
      [insertId, data.x, data.y, data.z, data.timestamp],
      function (err, result) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
}
async function insertAccel(data, insertId) {
  return new Promise((resolve, reject) => {
    const insertEntry =
      "INSERT INTO ACCEL (entryId, x, y, z, tsamp) VALUES (?,?,?,?,?);";
    dbcon.query(
      insertEntry,
      [insertId, data.x, data.y, data.z, data.timestamp],
      function (err, result) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
}
async function insertMagn(data, insertId) {
  return new Promise((resolve, reject) => {
    const insertEntry =
      "INSERT INTO MAGN (entryId, x, y, z, tsamp) VALUES (?,?,?,?,?);";
    dbcon.query(
      insertEntry,
      [insertId, data.x, data.y, data.z, data.timestamp],
      function (err, result) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
}
async function insertBaro(data, insertId) {
  return new Promise((resolve, reject) => {
    const insertEntry =
      "INSERT INTO BARO (entryId, pressure, tsamp) VALUES (?,?,?);";
    dbcon.query(
      insertEntry,
      [insertId, data.pressure, data.timestamp],
      function (err, result) {
        if (err) reject(err);
        resolve(true);
      }
    );
  });
}
