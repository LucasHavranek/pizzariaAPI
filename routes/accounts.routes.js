import express from "express"
const router = express.Router()
import { promises as fs } from "fs"
const { readFile, writeFile } = fs
import cors from "cors"
import accountController from "../controllers/accounts.controller.js"

router.post("/", accountController.createAccount)
router.get("/", accountController.getAccounts)
router.get("/:id", accountController.getAccountId)
router.delete("/:id", accountController.deleteAccount)
router.put("/", accountController.putAccount)
router.patch("/updateSaldo", accountController.patchAccount)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
