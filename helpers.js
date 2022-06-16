const fs = require("fs");
const csv = require("csv-parse");
const knex = require("knex");
const config = require("./knexfile.js");
const ObjectsToCsv = require("objects-to-csv");

const _db = knex(config);
const { parse } = csv;

const writeFile = async (filename, fileArray) => {
  const csv = new ObjectsToCsv(fileArray);
  await csv.toDisk(filename);
};

const readFile = (filename) => {
  if (!filename) return "Filename is required!";

  return new Promise((resolve, reject) => {
    const fileArray = [];
    fs.createReadStream(filename)
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", function (row) {
        fileArray.push({ ...row });
      })
      .on("end", function () {
        return resolve(fileArray);
      })
      .on("error", function (error) {
        console.log(error.message);
        return reject(error);
      });
  });
};

const searchEmployees = async (pkEmployees, employerId) => {
  try {
    return _db
      .select("PK_EMPLOYEE", "ID_EMPLOYEE_NUMBER")
      .from("EMPLOYEE")
      .where("ID_EMPLOYER", employerId)
      .whereIn("PK_EMPLOYEE", pkEmployees);
  } catch (error) {
    console.log(error);
  }
};

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const helpersModule = {
  chunk,
  readFile,
  writeFile,
  searchEmployees,
  sleep,
};

module.exports = helpersModule;
