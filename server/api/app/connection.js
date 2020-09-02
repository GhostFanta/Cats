const elasticSearch = require("elasticsearch");
const index = "cats";
const type = "json";
const host = "localhost";
const port = 9200;

const client = new elasticSearch.Client({ host: { host, port } });

async function putCatMapping() {
  const schema = {
    name: { type: "keyword" },
    origin: { type: "keyword" },
    data: {
      type: "text",
    },
  };

  return client.indices.putMapping({
    index,
    type,
    body: { properties: schema },
  });
}

async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    console.log("Connecting to ES");
    try {
      const health = await client.cluster.health({});
      console.log(health);
      isConnected = true;
    } catch (err) {
      console.log("Connection failed, Retrying...", err);
    }
  }
}

async function resetIndex() {
  if (await client.indices.exists({ index })) {
    await client.indices.delete({ index });
  }

  await client.indices.create({ index });
  await putCatMapping();
}

checkConnection();

module.exports = {client, index, type, checkConnection, resetIndex};

