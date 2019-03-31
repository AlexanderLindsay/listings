const CosmosClient = require("@azure/cosmos").CosmosClient;

var config = {};

config.database = {
  "id": "Wheeled",
  "containers" : {
    "feed": "Feed",
    "saved": "Saved",
    "lists": "Lists"
  }
};

config.cacheExpiresInMS = 3600000;

config.createClient = () => {
 const endpoint = process.env.AZURE_ENDPOINT;
 const masterKey = process.env.AZURE_MASTER_KEY;
 return new CosmosClient({ endpoint: endpoint, auth: { masterKey: masterKey } }); 
}

config.verifyExists = async (client, databaseId, containerId) => {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  await database.containers.createIfNotExists({ id: containerId });
}

module.exports = config;