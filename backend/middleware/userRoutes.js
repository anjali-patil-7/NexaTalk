import express from "express"
import protectRoute from "./protectRoute"
import { getUsersForSidebar } from "../controllers/usercontroller"

const router = express.Router()
router.get("/",protectRoute,getUsersForSidebar)

export default router