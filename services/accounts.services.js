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

async function getAccountId(id) {
    const data = JSON.parse(await readFile(global.fileName))
    const buscaId = data.accounts.find(account => account.id === parseInt(id))
    return buscaId
}

async function deleteAccount(id) {
    const data = JSON.parse(await readFile(global.fileName))
    const buscaId = data.accounts.filter(account => account.id !== parseInt(id))
    await writeFile(global.fileName, JSON.stringify(data, null, 2))
    return buscaId
}

async function updateAccount(account) {
    const data = JSON.parse(await readFile(global.fileName))
    const index = data.accounts.findIndex(i => i.id === account.id)
    data.accounts[index].nome = account.nome
    data.accounts[index].saldo = account.saldo
    await writeFile(global.fileName, JSON.stringify(data))
    return data.accounts[index]
}

async function updateBalance(account) {
    const data = JSON.parse(await readFile(global.fileName))
    const index = data.accounts.findIndex(i => i.id === account.id)
    data.accounts[index].nome = account.nome
    data.accounts[index].saldo = account.saldo
    await writeFile(global.fileName, JSON.stringify(data))
    return account
}

export default {
    createAccount,
    getAccounts,
    getAccountId,
    deleteAccount,
    updateAccount,
    updateBalance,
}