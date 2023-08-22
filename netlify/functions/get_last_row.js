// const { getCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  // const users = await getCollection();
  try {
    // const user = await users.create(id, event.body);

    const last_row = "this is FAKE last!";

    return {
      statusCode: 200,
      body: JSON.stringify({
        last_row: last_row,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (e) {
    console.error(`Error in get_last_row: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
