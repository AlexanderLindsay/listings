const config = require("./config");

const databaseConfig = config.database;
const databaseId = databaseConfig.id;
const containerId = databaseConfig.containers.feed;
const cacheExpiresInMS = config.cacheExpiresInMS;

const getClient = async () => {
  const client = config.createClient();
  await config.verifyExists(client, databaseId, containerId);
  return client;
}

const Parser = require('rss-parser');
const parser = new Parser();

const fillFeed = (feed) => {
  return {
    id: feed.id,
    title: feed.title,
    feedUrl: feed.feedUrl
  };
}

const fillFeedItem = (item, feed) => {
  return {
    id: item.guid,
    feed: feed,
    publishedOn: item.isoDate,
    link: item.link,
    title: item.title,
    content: item.content
  }
}

const addFeed = async (user, url) => {
  if(user === undefined) return;
  
  let feed = await parser.parseURL(url);
  
  let items = await fetchFeedItems(url, feed.title);
  let lastFetched = new Date().toISOString();
  
  let feedBody = {
    userId: user.sub,
    title: feed.title,
    description: feed.description,
    feedUrl: url,
    itemsCache: items,
    cacheUpdated: lastFetched
  };
  
  const client = await getClient();
  
  await client
    .database(databaseId)
    .container(containerId)
    .items.create(feedBody);
}

function createUserFeedQuery(user) {
  const querySpec = {
    query: "SELECT * FROM root r WHERE r.userId = @userId",
    parameters: [
      {
        name: "@userId",
        value: user.sub
      }
    ]
  };
  
  return querySpec;
}

const fetchFeedItems = async (url, feed) => {
  try {
  const data = await parser.parseURL(url);
      return data.items.map(i => {
        return fillFeedItem(i, feed);
      });
  }catch(err) {
    console.log(`Error trying to fetch items from ${url}`)
    console.log(err);
    return [];
  }
}

const getFeeds = async (client, user) => {
  if(user === undefined) return [];
  
  const querySpec = createUserFeedQuery(user);
    
  const { result: feeds } = 
        await client
          .database(databaseId)
          .container(containerId)
          .items.query(querySpec)
          .toArray();
          
    return feeds;
}

const updateCache = async (client, feed) => {
  let items = await fetchFeedItems(feed.feedUrl, feed.title);
  let now = new Date().toISOString();
     
  const old = 
        await client
          .database(databaseId)
          .container(containerId)
          .item(feed.id);
  
  const { body: newFeed } = await old.read();
  
  newFeed.itemsCache = items;
  newFeed.cacheUpdated = now;
  
  await old.replace(newFeed);
  
  return items;  
}

const getFeedList = async user => {
  const client = await getClient();
  const feeds = await getFeeds(client, user);
  return feeds.map(fillFeed);
}

const getFeedItems = async (client, feed) => {
  const now = new Date();
  const cacheExpired = new Date(new Date(feed.cacheUpdated).getTime() + cacheExpiresInMS);
   
  if(feed.cacheUpdated === undefined || now >= cacheExpired) {
    console.log("update cache: " + feed.title);
    return await updateCache(client, feed);
  }
  
  return feed.itemsCache;
}

const getItems = async user => {
  if(user === undefined) return [];
  
  const client = await getClient();
  const feeds = await getFeeds(client, user);
  const feedToItems = async (feed) => getFeedItems(client, feed);
  
  const lists = await Promise.all(feeds
    .map(feedToItems));
      
  return lists
    .reduce((acc, val) => acc.concat(val), [])
    .sort((a, b) => {
      const aValue = new Date(a.publishedOn);
      const bValue = new Date(b.publishedOn);
      const diff = bValue - aValue;
    
      if(diff < 0) return -1;
      if(diff > 0) return 1;
      return 0;
    });
};

module.exports = {
  get: getFeedList,
  add: addFeed,
  getItems: getItems
};