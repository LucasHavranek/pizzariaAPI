import { promises as fs } from "fs"
const { readFile, writeFile } = fs

async function createAccount(req, res, next) {
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
}

export default {
    createAccount
}