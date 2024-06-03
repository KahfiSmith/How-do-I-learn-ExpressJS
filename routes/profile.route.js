import express from 'express'
import { getProfileUser, updateProfileUser } from '../controller/profile-user.controller.js'

const router = express.Router()

router.get('/profil-user/:id_user', getProfileUser)
router.put('/profil-user-edit/:id_user', updateProfileUser)

export default router



