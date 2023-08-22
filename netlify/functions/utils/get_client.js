const { Client } = require('cassandra-driver');

let db_client = null;

const get_db_client = async () => {
  let just_created = false;
  if (db_client === null) {
    const config = {
      cloud: {
        secureConnectBundle: process.env.ASTRA_DB_SECURE_BUNDLE_PATH
      },
      credentials: {
        username: "token",
        password: process.env.ASTRA_DB_APPLICATION_TOKEN
      },
      keyspace: process.env.ASTRA_DB_KEYSPACE
    };
    db_client = new Client(config);
    await db_client.connect();

    // Table creation on client instantiation (tsk, tsk)
    await db_client.execute(`CREATE TABLE IF NOT EXISTS netli_messages (
      app_name TEXT,
      inserted_at TIMESTAMP,
      body TEXT,
      PRIMARY KEY ( ( app_name ) , inserted_at )
    ) WITH CLUSTERING ORDER BY (inserted_at DESC);`);

    just_created = true;
  }
  return {
    db_client,
    just_created
  };
};

module.exports = { get_db_client };
