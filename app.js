const os = require('os')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Shalom Olam'))
app.get('/host', (req, res) => res.send(os.hostname()))

app.listen(port, () => console.log(`App listening on port ${port}!`))