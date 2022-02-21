const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.send('Helloo')
})

app.get('/zdravo', (req, res) => {
    res.send('Helloo zdravo')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})