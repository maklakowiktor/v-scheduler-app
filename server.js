const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(serveStatic(__dirname + '/dist'));

app.get('/', (req, res) => {
    res.redirect('/');
})

app.get('/*', (req, res) => {
    res.redirect('/');
})

app.listen(PORT, () => {
    console.log(`Server has been started on PORT: ${PORT}`);
})
