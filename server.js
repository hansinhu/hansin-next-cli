const {
	createServer
} = require('http')
const {
	parse
} = require('url')
const next = require('next')
const pathMatch = require('path-match')
const { join } = require('path')

const dev = process.env.NODE_ENV !== 'production'
const app = next({
	dev
})
const handle = app.getRequestHandler()
const route = pathMatch()
const match = route('/company/?type=type')
const match2 = route('/products/?type=type')
const match3 = route('/detail/?itemId=itemId')
	//const match = [route('/blog/:id'), route('/products/:type'), route('/productdetail/:item_id')];

app.prepare()
	.then(() => {
		createServer((req, res) => {
				const {
					pathname,
					query
				} = parse(req.url, true)
				const params = match(pathname) || match2(pathname) || match3(pathname);
				//sw
				/*if(pathname === '/service-worker.js'){
                    const filePath = join(__dirname, '.next', pathname)
                    app.serveStatic(req, res, filePath)
				}
				else */if(params === false){ //
					handle(req, res)
					return
				}
				// assigning `query` into the params means that we still
				// get the query string passed to our application
				// i.e. /blog/foo?show-comments=true
				app.render(req, res, pathname, Object.assign(params, query))
			})
			.listen(3000, (err) => {
				if (err) throw err
				console.log('> Ready on http://localhost:3000')
			})
	})