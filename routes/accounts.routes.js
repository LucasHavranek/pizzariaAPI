import express from "express"
const router = express.Router()
import { promises as fs } from "fs"
const { readFile, writeFile } = fs
import cors from "cors"

router.post("/", async (req, res, next) => {
    try {
        let account = req.body

        if (!account.nome || account.saldo == null) {
            throw new Error("Nome e saldo são obrigatórios")
        }

        const data = JSON.parse(await readFile(global.fileName))

        account = { id: data.nextId++, nome: account.nome, saldo: account.saldo }
        data.accounts.push(account)
        await writeFile(global.fileName, JSON.stringify(data, null, 2))

        res.send(account)
        logger.info(`POST /account- ${JSON.stringify(account)}`)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName))
        delete data.nextId
        res.send(data)
        logger.info("GET /account")
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName))
        const buscaId = data.accounts.find(account => account.id === parseInt(req.params.id))
        res.send(buscaId)
        logger.info("GET /account/:id")
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName))
        const buscaId = data.accounts.filter(account => account.id !== parseInt(req.params.id))
        await writeFile(global.fileName, JSON.stringify(data, null, 2))
        res.send(buscaId)
        logger.info(`DELETE /account/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
})

router.put("/", async (req, res, next) => {
    try {
        const account = req.body
        const data = JSON.parse(await readFile(global.fileName))
        const index = data.accounts.findIndex(i => i.id === account.id)

        if (index === -1) {
            throw new Error("Registro não encontrado")
        }

        if (account.id == null || !account.nome || account.saldo == null) {
            throw new Error("Nome e saldo são obrigatórios")
        }

        data.accounts[index].nome = account.nome
        data.accounts[index].saldo = account.saldo
        await writeFile(global.fileName, JSON.stringify(data))
        res.send(account)
        logger.info(`PUT /account- ${JSON.stringify(account, null, 2)}`)
    } catch (err) {
        next(err)
    }
})

router.patch("/updateSaldo", async (req, res, next) => {
    try {
        const account = req.body
        const data = JSON.parse(await readFile(global.fileName))
        const index = data.accounts.findIndex(i => i.id === account.id)

        if (index === -1) {
            throw new Error("Registro não encontrado")
        }

        if (account.id == null) {
            throw new Error("Id é obrigatório")
        }

        data.accounts[index].nome = account.nome
        data.accounts[index].saldo = account.saldo
        await writeFile(global.fileName, JSON.stringify(data))
        res.send(data.accounts[index])
        logger.info(`PATCH /account- ${JSON.stringify(data.accounts[index])}`)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
