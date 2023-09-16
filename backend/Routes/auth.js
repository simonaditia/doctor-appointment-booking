import express from "express"
import {
    register,
    login
} from "../Controllers/authController.js"

export const router = express.Router()

router.post("/register", register)
router.post("/login", login)

export default router