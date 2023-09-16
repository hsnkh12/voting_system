const express = require("express")
const app = express()
const rabbitMQ = require("./modules/rabbitmq/rabbitmq.config")
const cors = require("cors")
const db = require("./modules/storage/db.config")
const votesRouter = require("./modules/routes/votes.routes")
const resultsRouter = require("./modules/routes/results.routes")
const path = require("path")
const fs = require('fs');
require("dotenv").config();
const modelsFolder = path.join(__dirname, '/modules/storage/models');

fs.readdirSync(modelsFolder)
    .forEach(file => {
        if (file.endsWith('.js')) {
            const model = require(path.join(modelsFolder, file));
        }
});

app.use(express.json());
app.use(cors({
    origin: '*'
}));



app.use("/votes", votesRouter)
app.use("/results", resultsRouter)


rabbitMQ.init().then(() => {
    db.sync({force: false})
    }).then(
        () => {
            app.listen(process.env.APP_PORT)
        }
    ).catch(err => {
        console.log(err)
    })