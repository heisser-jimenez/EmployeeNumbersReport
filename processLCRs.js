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
    const filename = "./toProcess/2.0 all_licenses_should_be_activate_06052022.csv";
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
          ID_EMPLOYEE_LIC: ch["0"],
          PK_EMPLOYEE: ch["1"],
          PK_LICENSE: ch["2"],
          ID_STATE: ch["3"],
          ID_BOARD: ch["4"],
          ID_PROFESSION: ch["5"],
          IN_CERTIFICATION: ch["6"],
          DS_LICENSE_NUMBER: ch["7"],
          DS_CUSTOM_LICENSE_NUMBER: ch["8"],
          IN_STATUS: ch["9"],
          CD_STATUS_LABEL: ch["10"],
          DT_UNTIED: ch["11"],
          DT_IMPORTED: ch["12"],
          ID_IMPORTED_FILE: ch["13"],
          DT_REMOVED: ch["14"],
          ID_REMOVED_FILE: ch["15"],
          IN_COMPLIANCE_NEEDED: ch["16"],
          DS_WARNING_ERROR: ch["17"],
          CD_UPLOAD_MESSAGE_LST: ch["18"],
          IN_REQUIRES_FURTHER_RESEARCH: ch["19"],
          DS_LV_LICENSE_NUMBER: ch["20"],
          DT_READ_BY_LV: ch["21"],
          DT_UPDATED_BY_LV: ch["22"],
          ID_ADDED: ch["23"],
          DT_ADDED: ch["24"],
          ID_UPDATED: ch["25"],
          DT_UPDATED: ch["26"],
          DS_ALIAS_LICENSE_NUMBER: ch["27"],
          ID_CEB_EMPLOYEE: ch["28"],
          ID_CEB_EMPLOYEE_LIC: ch["29"],
          PK_CEB_LICENSE: ch["30"],
          IN_ADDED_TO_LIST: ch["31"],
          IN_DRIVER_LICENSE: ch["32"],
          ID_APPLICANT: ch["33"],
          IN_VERIFICATION_ERROR: ch["34"],
          ID_EMPLOYEE_NUMBER: idEmployeeNumber || 0,
        };
      });

      newFileArray.push(...newChunk);
      const percentage = Math.round(
        ((index + 1) / Math.round(fileArray.length / chunkSize, 0)) * 100,
        0
      );
      console.log(`${percentage}%`);
    }

    await writeFile("./processed/LCRs.csv", newFileArray);
  } catch (error) {
    console.log(error);
  } finally {
    process.exit(0);
  }
})();
