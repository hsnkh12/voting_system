const express = require("express")
const app = express()
const usersRouter = require("./routes/users.routes")
const candidatesRouter = require("./routes/candidates.routes")
const electionsRouter = require("./routes/elections.routes")
const complainsRouter = require("./routes/complains.routes")
const cors = require("cors")
// const xss = require('xss-clean');

app.use(express.json());
// app.use(xss());
app.use(cors({
    origin: '*'
}));

app.use("/users", usersRouter)
app.use("/elections", electionsRouter)
app.use("/candidates", candidatesRouter)
app.use("/complains", complainsRouter)

module.exports = app