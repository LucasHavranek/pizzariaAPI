import express from "express"
const router = express.Router()
import accountController from "../controllers/accounts.controller.js"

router.post("/", accountController.createAccount)
router.get("/", accountController.getAccounts)
router.get("/:id", accountController.getAccountId)
router.delete("/:id", accountController.deleteAccount)
router.put("/", accountController.updateAccount)
router.patch("/updateSaldo", accountController.updateBalance)

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
    res.status(400).send({ error: err.message })
})

export default router
