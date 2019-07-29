const express = require('express')
const app = express()
const PORT = 5343

const bodyParser = require('body-parser')
app.use(bodyParser.json())

function parseUrl(url) {
  let query = url.split('?q=')
  query[0] = ''
  return query.join('')
}

const bangs = require('./bangs')
function parseBang(query) {
  console.log(query)
  let q = query.replace('!', '')
  console.log(q)
  q = q.split('+')
  console.log(q)
  let name = q[0]
  let newquery;
  if (q.length == 2)
    newquery = q.slice(1)
  else
    newquery = q.slice(1, q.length - 1).join('+')
  console.log(name, newquery)
  return bangs[name] + newquery
}


app.get('/search', (req, res) => {
  let query = parseUrl(req.originalUrl)
  if (query[0] == "!") {
    if (parseBang(query)) {
      res.redirect(parseBang(query))
    } else {
      res.redirect(`https://www.google.com/search?q=${query}`)
    }
  } else {
    res.redirect(`https://www.google.com/search?q=${query}`)
  }
})

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}/`))