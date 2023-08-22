const { get_db_client } = require("./utils/get_client");

const row_read_statement = "SELECT body FROM netli_messages WHERE app_name=? LIMIT 1;";

exports.handler = async function (event) {
  const {db_client, just_created} = await get_db_client();
  try {

    const rows = await db_client.execute(
      row_read_statement,
      ['netli_demo'],
      {prepare: true}
    );
    const row = rows.first();
    last_message = (row || {}).body || "NO_RESULTS";

    return {
      statusCode: 200,
      body: JSON.stringify({
        last_message,
        just_created
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (e) {
    console.error(`Error in get_last_message: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
