# EmployeeNumbersReport
Merge the employeeNumbers from two excel files

# Requirements
* .env file must be in the root folder, this mean inside of /EmployeeNumbersReport
* Node js version must be Node js v8.17.0 or other versions that support OracleDB instalation


```

EMPLOYER_ID=
CHUNK_SIZE=
CLIENT=oracledb
DB_USER=
DB_PASSWORD=
DB_CONNECTION_STRING=10.21.100.191/PDB_ECTEST01

```
Note: replace the connection string depending on the environment.

# How to execute the processes ?

From the command line inside the root folder, execute the command:

```
npm run start:lcr
```

This will generate a .csv file in the processed folder (This will be a copy of the file inside toProcess folder but with an aditional column at the end)

---------------

From the command line inside the root folder, execute the command:

```
npm run start:unmonitored
```

This will generate a .csv file in the processed folder (This will be a copy of the file inside toProcess folder but with an aditional column at the end)
