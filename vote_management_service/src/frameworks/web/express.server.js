const express = require("express")
const app = express()
const votesRouter = require("./routes/votes.routes")
const resultsRouter = require("./routes/results.routes")
const cors = require("cors")


app.use(express.json());
app.use(cors({
    origin: '*'
}));

app.use("/votes", votesRouter)
app.use("/results", resultsRouter)


module.exports = app