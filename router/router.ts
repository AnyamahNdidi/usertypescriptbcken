import express from "express"

import {getuser, signuser} from "../controller/usercontroller"
const router = express.Router()

router.route("/register").post(signuser)
router.route("/").get(getuser)

export default router