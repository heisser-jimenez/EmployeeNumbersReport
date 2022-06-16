const {
  CLIENT: client,
  DB_USER: user,
  DB_PASSWORD: password,
  DB_CONNECTION_STRING: connectString,
} = process.env;

const connectionData = {
  client,
  connection: {
    user,
    password,
    connectString,
  },
};

module.exports = connectionData;
