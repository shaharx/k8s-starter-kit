const os = require('os')
const fs = require('fs')
const express = require('express')
const app = express()
const port = 3000
const dataPath = getDataPath()

app.get('/', (req, res) => res.send('Shalom Olam'))

app.get('/host', (req, res) => res.send(os.hostname()))

app.get('/write/:content', (req, res) => {
    const content = req.params.content
    var message = ''
    try {
        fs.writeFileSync(`${dataPath}/${content}`, content)
        message = `${content} was written successfully`
    } catch (e) {
        message = 'Could not write, deal with that'
    }
    res.send(message)
})

app.get('/read', (req, res) => {
    try {
        var data = fs.readdirSync(dataPath)
    } catch (e) {
        res.send('Directory not found')
    }
    res.send(data)
})

function getDataPath() {
    var dataPath = `${process.cwd()}/data/files`
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true })
    }
    return dataPath
}

app.listen(port, () => console.log(`App listening on port ${port}!`))