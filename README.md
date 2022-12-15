## ARS furniture backend

### Available routes
`/products`: Get all products
`/auth`: Authentication for /register and /login
`/reviews`: Reviews
`/orders`: Orders
`/users`: Users for admin only


### Essential config
`.env` file config: `DB_URL` for your mongodb url and `AUTH_TOKEN` for jwt token

### Available scripts
1. `npm i`        : install all essential packages
2. `npm run dev`  : start the dev server
3. `npm run test` : unit tests for each routes

