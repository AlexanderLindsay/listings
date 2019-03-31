const config = require("./config");

const database = config.database;
const databaseId = database.id;
const containerId = database.containers.saved;

const getClient = async () => {
  const client = config.createClient();
  await config.verifyExists(client, databaseId, containerId);
  return client;
}

const addCheckToQuery = (value, name, join, where, spec) => {
  if(value === undefined || value === null || value.length === 0) {
    return spec;
  }
  
  var joins = spec.joins;
  if(join.length > 0) {
    joins.push(join);
  }
  
  var wheres = spec.wheres;
  if(where.length > 0) {
    wheres.push(where);
  }
  
  return {
    base: spec.base,
    joins: joins,
    wheres: wheres,
    parameters: spec.parameters.concat([
      { name: name, value: value }
    ])
  };
}

const finalizeSpec = (spec) => {
  return {
    query: `${spec.base}
    ${spec.joins.join('\n')}
    WHERE ${spec.wheres.join('\n AND ')}
    `,
    parameters: spec.parameters
  };
}

const createSavedItemsQuery = (user, includeRead, type, tags) => {
    
  const baseQuerySpec = {
    base: `
      SELECT DISTINCT
        r.id,
        r.title,
        r.type,
        r.link,
        r.description,
        r.tags,
        r.isRead,
        r.createdOn,
        r.readOn
      FROM root r
    `,
    joins: [
    ],
    wheres: [
      "r.userId = @userId",
      "(r.isRead = false or @includeRead = true)"
    ],
    parameters: [
      {
        name: "@userId",
        value: user.sub
      },
      {
        name: "@includeRead",
        value: includeRead
      }
    ]
  }
  
  var addType = addCheckToQuery.bind(null, type, "@type", "", "r.type = @type");
  var addTags = addCheckToQuery.bind(null, tags, "@tags", "JOIN t in r.tags", "ARRAY_CONTAINS(@tags, t)");
  
  var finalSpec = finalizeSpec(
    addTags(addType(baseQuerySpec)));
  
  return finalSpec;
}

const createTagsQuery = (user) => {
 const querySpec = {
   query: "SELECT DISTINCT VALUE t FROM root r " +
   "JOIN t in r.tags " + 
   "WHERE r.userId = @userId ",
   parameters: [
     {
       name: "@userId",
       value: user.sub
     }
   ]
 };
  
  return querySpec;
}

const fillItem = item => {
  return {
    id: item.id,
    title: item.title,
    link: item.link,
    description: item.description,
    tags: item.tags,
    type: item.type,
    isRead: item.isRead,
    createdOn: item.createdOn,
    readOn: item.readOn
  };
}

const getSavedItems = async (user, includeRead, type, tags) => {
  if(user === undefined) return [];
  
  const querySpec = createSavedItemsQuery(user, includeRead, type, tags);
  
  const client = await getClient();
    
  const { result: items } = 
        await client
          .database(databaseId)
          .container(containerId)
          .items.query(querySpec)
          .toArray();
          
    return items;
}

const getSavedItem = async (user, itemId) => {
  if(user === undefined) return [];
   
  const client = await getClient();
    
  const { body: item } = 
        await client
          .database(databaseId)
          .container(containerId)
          .item(itemId)
          .read();
           
  return fillItem(item);
}

const buildSavedItem = (user, item) => {
  return {
    userId: user.sub,
    title: item.title,
    link: item.link,
    description: item.description,
    tags: item.tags,
    type: item.type,
    isRead: item.isRead,
    createdOn: item.createdOn,
    readOn: item.readOn
  };
}

const addSavedItem = async (user, item) => {
  if(user === undefined) return;
  
  item.title = item.title || item.link;
  item.isRead = false;
  item.createdOn = Date.now();
  
  let savedItem = buildSavedItem(user, item);
  
  const client = await getClient();
  
  await client
    .database(databaseId)
    .container(containerId)
    .items.create(savedItem);
}

const updateSavedItem = async (user, id, item) => {
  if(user === undefined) return;
  
  const client = await getClient();
  
  let savedItem = buildSavedItem(user, item);
  savedItem.id = id;
  
  await client
    .database(databaseId)
    .container(containerId)
    .item(savedItem.id)
    .replace(savedItem);
}

const getTags = async (user) => {
  if(user === undefined) return;
  
  const client = await getClient();
  
  const querySpec = createTagsQuery(user);
  
  const { result: tags } =
    await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .toArray();
  
  return tags;
}

module.exports = {
  list: getSavedItems,
  get: getSavedItem,
  add: addSavedItem,
  update: updateSavedItem,
  tags: getTags
};