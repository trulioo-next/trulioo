
const express = require('express')
const helmet = require('helmet')
const next = require('next')
const cache = require('lru-cache')
const { join } = require('path')

const CONFIG = require('./next.config')

const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 3000
const IS_DEV_ENV = NODE_ENV === 'development'
const QUIET_MODE = false
const PROJECT_DIR = './'


const ssrCache = new cache({
  max: 60,
  maxAge: 1000 * 60 * 30,
});

const App = next({
  dev: IS_DEV_ENV,
  dir: PROJECT_DIR,
  quiet: QUIET_MODE,
  conf: CONFIG
})


App.prepare().then(() => {
  const handle = App.getRequestHandler()
  const server = express();

  // TODO: Set rate-limiting

  server.use(helmet())

  // TODO: Set CSP directives
  // server.use(helmet.contentSecurityPolicy({
  //   directives: {
  //     defaultSrc: ["'self'"],
  //   }
  // }))

  // server.use(bodyParser.urlencoded({ extended: false }))
  // server.use(express.json());

  server.set('trust proxy', true);
  server.set('strict routing', true);

  // trailing slash redirect
  server.use((req, res, next) => {
    if (req.path.substr(-1) == '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        res.redirect(301, req.path.slice(0, -1) + query);
    } else {
        next();
    }
  });

  server.get('/', (req, res) => {
    cacher(req, res, '/');
  });
  
  server.get('/shop/discount/:slug', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    return App.render(req, res, '/shop', mergedQuery);
  });

  server.get('/discount/:slug', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    return App.render(req, res, '/shop', mergedQuery);
  });

  server.get('/partners/:ref', (req, res) => {
    const mergedQuery = Object.assign({}, req.query, req.params);
    return App.render(req, res, '/', mergedQuery);
  });

  server.get('*', (req, res) => {
    if (req.url.includes('/sw')) {
      const filePath = join(__dirname, 'static', 'workbox', 'sw.js');
      App.serveStatic(req, res, filePath);
    } else if (req.url.startsWith('static/workbox/')) {
      App.serveStatic(req, res, join(__dirname, req.url));
    } else {
      return handle(req, res, req.url);
    }
  });

  server.post('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) throw err
    console.log(`> Server is running...\n`)
  })
});

/*
* Cache server side rended pages
*/
async function cacher(req, res, pagePath, queryParams) {
  const key = req.url;

  // if page is in cache, server from cache
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT');
    res.send(ssrCache.get(key));
    return;
  }

  try {
    // if not in cache, render the page into HTML
    const html = await App.renderToHTML(req, res, pagePath, queryParams)

    // if something went wrong with the request, skip the caching
    if (res.statusCode !== 200) {
      res.send(html);
      return;
    }

    ssrCache.set(key, html);

    res.setHeader('x-cache', 'MISS');
    res.send(html);
  } catch (err) {
    App.renderError(err, req, res, pagePath, queryParams);
  }
}
