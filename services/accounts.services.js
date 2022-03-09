import { promises as fs } from "fs"
const { readFile, writeFile } = fs


async function createAccount(account) {
    const data = JSON.parse(await readFile(global.fileName))

    account = { id: data.nextId++, nome: account.nome, saldo: account.saldo }
    data.accounts.push(account)
    await writeFile(global.fileName, JSON.stringify(data, null, 2))

    return account
}

async function getAccounts() {
    const data = JSON.parse(await readFile(global.fileName))
    delete data.nextId
    return data
}

export default {
    createAccount,
    getAccounts
}