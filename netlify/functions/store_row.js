// const { getCollection } = require("./utils/astraClient");

exports.handler = async function (event) {
  // const users = await getCollection();
  try {
    // const user = await users.create(id, event.body);
    body = JSON.parse(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `stored "${body.new_message}"`,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    };
  } catch (e) {
    console.error(`Error in store_row: ${e}`);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
