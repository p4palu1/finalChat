import express from "express"
import { getMessages, sendMessage } from "../controllers/MessageControllers.js"
import { getGroups, addGroup } from "../controllers/GroupControllers.js"

const router = express()

router.get("/messages/:id", getMessages)
        .post("/", sendMessage)


export default router