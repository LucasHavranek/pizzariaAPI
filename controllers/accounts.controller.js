import accountService from "../services/accounts.services.js"


async function createAccount(req, res, next) {
    try {
        let account = req.body

        if (!account.nome || account.saldo == null) {
            throw new Error("Nome e saldo são obrigatórios")
        }

        account = await accountService.createAccount(account)
        res.send(account)
        logger.info(`POST /account- ${JSON.stringify(account)}`)

    } catch (err) {
        next(err)
    }
}

async function getAccounts(req, res, next) {
    try {
        res.send(await accountService.getAccounts())
        logger.info("GET /account")
    } catch (err) {
        next(err)
    }
}

async function getAccountId(req, res, next) {
    try {
        res.send(await accountService.getAccountId(req.params.id))
        logger.info("GET /account/:id")
    } catch (err) {
        next(err)
    }
}

async function deleteAccount(req, res, next) {
    try {
        await accountService.deleteAccount(req.params.id)
        res.end()
        logger.info(`DELETE /account/:id - ${req.params.id}`)
    } catch (err) {
        next(err)
    }
}

async function updateAccount(req, res, next) {
    try {
        const account = req.body
        if (index === -1) {
            throw new Error("Registro não encontrado")
        }

        if (account.id == null || !account.nome || account.saldo == null) {
            throw new Error("Nome e saldo são obrigatórios")
        }
        res.send(await accountService.updateAccount(account))
        logger.info(`PUT /account- ${JSON.stringify(account, null, 2)}`)
    } catch (err) {
        next(err)
    }
}

async function updateBalance(req, res, next) {
    try {
        const account = req.body
        
        if (index === -1) {
            throw new Error("Registro não encontrado")
        }

        if (account.id == null) {
            throw new Error("Id é obrigatório")
        }
        res.send(accountService.updateBalance(account))
        logger.info(`PATCH /account- ${JSON.stringify(data.accounts[index])}`)
    } catch (err) {
        next(err)
    }
}

export default {
    createAccount,
    getAccounts,
    getAccountId,
    deleteAccount,
    updateAccount,
    updateBalance,
}