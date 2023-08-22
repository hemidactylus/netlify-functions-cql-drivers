const moment = require('moment');

const { get_db_client } = require("./utils/get_client");

const row_insert_statement = "INSERT INTO netli_messages (app_name, inserted_at, body) VALUES (?, ?, ?);";

exports.handler = async function (event) {
  const {db_client, just_created} = await get_db_client();
  try {
    body = JSON.parse(event.body);

    await db_client.execute(
      row_insert_statement,
      ['netli_demo', moment().valueOf(), body.new_message],
      {prepare: true}
    )
    //
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `stored "${body.new_message}"`,
        just_created
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (e) {
    console.error(`Error in store_message: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
