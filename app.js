const express = require('express');
const { show } = require('./debug/debug.js');
const bodyParser = require('body-parser');
const { Connect } = require('./db/connect.js');
const { errorHandle } = require('./middleware/error-handle.js');
const task = require('./router/task.router.js');
const fs = require('fs');
require('dotenv').config();

const port = process.env.PORT || 3000;
const db_url = process.env.DATABASE_URL;
const indexHtmlContent = fs.readFileSync('index.html', 'utf-8');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }));

app.get('/', (req, res) => {
    res.send(indexHtmlContent);
});

app.use('/task', task);

app.use((req, res) => {
    res.status(404).send('khong tim thay');
});

app.use(errorHandle);

app.listen(port, async (req, res) => {
    try {
        let client = await Connect.getClient(db_url);
        show(`dang lang nghe o cong ${port}`);
    } catch (err) {
        show({ err });
    }
});
