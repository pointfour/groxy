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

app.get('/search', (req, res) => {
  let query = parseUrl(req.originalUrl)
  if (query[0] == "!") {
    res.redirect(`https://duckduckgo.com/?q=${query}`)
  } else {
    res.redirect(`https://www.google.com/search?q=${query}`)
  }
})

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}/`))