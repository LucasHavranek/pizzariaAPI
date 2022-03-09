import express from "express"
import winston, { loggers } from "winston"
import accountsRouter from "./routes/accounts.routes.js"
import { promises as fs } from "fs"
const { readFile, writeFile } = fs
import cors from "cors"

global.fileName = "accounts.json"

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp}) => {
    return `${timestamp} [${label}] ${level}: ${message}`
})
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({filename: "primeiroProjeto.log"})
    ],
    format: combine(
        label({ label: "primeiroProjeto"}),
        timestamp(),
        myFormat
    )
})

const app = express()
app.use(express.json())
app.use(cors())

app.use("/account", accountsRouter)


app.listen(3000, async () => {
    try {
        await readFile("accounts.json")
        logger.info('API em execução')
    } catch (err) {
        const initialJson = {
            nextId: 1,
            accounts: []
        }
        writeFile("accounts.json", JSON.stringify(initialJson)).then(() => {
            logger.info('API em execução')
        }).catch(err => {
            logger.error(err)
        })
    }


})