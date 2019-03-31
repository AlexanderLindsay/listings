// server.js

// init project
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-body');
const koaStatic = require('koa-static');
const jwt = require('koa-jwt');
const { koaJwtSecret } = require('jwks-rsa');

const port = process.env.PORT;

const app = new Koa();
const router = new Router();

const buildJwt = (passthrough) => {
      return jwt({
        secret : koaJwtSecret({
          jwksUri: process.env.AUTH0_JWKS,
          cache: true,
          cacheMaxEntries: 5,
          cacheMaxAge: 36000000 
        }),
        passthrough : passthrough
      });
};

const feedSource = require('./onServer/data/feeds.js');
const savedItemSource = require('./onServer/data/saved.js');

const toBool = (value) => {
 return value === 'true';
}

const toArray = (value) => {
  if(value === undefined || value === null) {
    return [];
  }
  
  var result = value.split(',');
  return result;
}

const serveOptions = {
  index: 'index.html',
  extensions: [ 'html' ]
}
app.use(koaStatic('./public', serveOptions));

router.get('/api/feeds', buildJwt(false), async ctx => {
  const feeds = await feedSource.get(ctx.state.user);
  ctx.body = feeds;
});

router.put('/api/feeds', buildJwt(false), bodyParser(), async ctx => {
  const {feedUrl} = ctx.request.body;
  await feedSource.add(ctx.state.user, feedUrl);
  return ctx.status = 200;
});

router.get('/api/tags', buildJwt(false), async ctx => {
  const tags = await savedItemSource.tags(ctx.state.user);
  ctx.body = tags;
});

router.get('/api/savedItems', buildJwt(false), async ctx => {
  const savedItems = await savedItemSource.list(
      ctx.state.user, 
      toBool(ctx.query.includeRead), 
      ctx.query.type,
      toArray(ctx.query.tags)
  );
  ctx.body = savedItems;
});

router.get('/api/savedItems/:id', buildJwt(false), async ctx => {
  const itemId = ctx.params.id;
  const item = await savedItemSource.get(ctx.state.user, itemId);
  console.log(item);
  ctx.body = item;
});

router.put('/api/savedItems', buildJwt(false), bodyParser(), async ctx => {
  const item = ctx.request.body;
  await savedItemSource.add(ctx.state.user, item);
  return ctx.status = 200;
});

router.patch('/api/savedItems/read/:id', buildJwt(false), async ctx => {
  const itemId = ctx.params.id;
  const item = await savedItemSource.get(ctx.state.user, itemId);
  item.isRead = true;
  item.readOn = Date.now();
  await savedItemSource.update(ctx.state.user, ctx.params.id, item);
  return ctx.status = 200;
});

router.patch('/api/savedItems/:id', buildJwt(false), bodyParser(), async ctx => {
  const item = ctx.request.body;
  await savedItemSource.update(ctx.state.user, ctx.params.id, item);
  return ctx.status = 200;
});

router.get('/api/feeditems', buildJwt(false), async ctx => {
  const items = await feedSource.getItems(ctx.state.user);
  ctx.body = items;
});

app.use(router.routes());

const listener = app.listen(port, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});