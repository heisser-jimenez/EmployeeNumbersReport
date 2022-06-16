require("dotenv").config();
const { chunk, readFile, writeFile, searchEmployees } = require("./helpers");
const {
  EMPLOYER_ID,
  CHUNK_SIZE
} = process.env;

(async () => {
  try {
    const employerId = +EMPLOYER_ID;
    const chunkSize = +CHUNK_SIZE;
    const filename = "./toProcess/2.0 all_unmonitored_should_be_activate_06052022.csv";
    const fileArray = await readFile(filename);

    const chunks = chunk(fileArray, chunkSize);

    const newFileArray = [];
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];

      const pks = chunk.map((item) => (item["1"] ? +item["1"] : 0));

      const employees = await searchEmployees(pks, employerId);
      const newChunk = chunk.map((ch) => {
        const idEmployeeNumber = employees.find(
          (employee) => employee.PK_EMPLOYEE == ch["1"]
        );

        return {
          ID_UNMONITORED_LICENSE: ch["0"],
          PK_EMPLOYEE: ch["1"],
          NM_CERTIFICATION: ch["2"],
          DT_STATUS: ch["3"],
          IN_STATUS: ch["4"],
          ID_IMPORTED_FILE: ch["5"],
          DT_IMPORTED: ch["6"],
          ID_REMOVED_FILE: ch["7"],
          DT_REMOVED: ch["8"],
          ID_ADDED: ch["9"],
          DT_ADDED: ch["10"],
          ID_UPDATED: ch["11"],
          DT_UPDATED: ch["12"],
          ID_REFERENCE: ch["13"],
          ID_ROOM: ch["14"],
          DS_CERTIFICATION_NUMBER: ch["15"],
          CD_CERTIFICATION_JR: ch["16"],
          NM_ISSUING_AUTH: ch["17"],
          ID_ISSUING_AUTH: ch["18"],
          ID_EMPLOYEE_NUMBER: idEmployeeNumber || 0,
        };
      });

      newFileArray.push(...newChunk);
      //   await sleep(300);
      const percentage = Math.round(
        ((index + 1) / Math.round(fileArray.length / chunkSize, 0)) * 100,
        0
      );
      if (percentage <= 100) console.log(`${percentage}%`);
    }

    await writeFile("./processed/unmonitored.csv", newFileArray);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
})();
