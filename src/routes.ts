import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateComplimentController } from './controllers/CreateComplimentController'
import { CreateTagController } from './controllers/CreateTagController'
import { CreateUserController } from './controllers/CreateUserController'
import { ListTagsController } from './controllers/ListTagsController'
import { ListUserReceiveComplimentsController } from './controllers/ListUserReceiveComplimentsController'
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentsController'
import { ensureAdmin } from './middlewares/ensureAdmin'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'

const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticateUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listTagsController = new ListTagsController()
const listUsersController = new ListUsersController()

router.post('/tags', 
    ensureAuthenticated, 
    createTagController.handle
)
router.post('/users', createUserController.handle)
router.post('/login', 
    ensureAdmin, 
    authenticateUserController.handle
)
router.post('/compliments',
    ensureAuthenticated,
    createComplimentController.handle
)

router.get("/users/compliments/send", listUserSendComplimentsController.handle)
router.get("/users/compliments/receive", listUserReceiveComplimentsController.handle)

router.get("/tags", 
    ensureAuthenticated, 
    listTagsController.handle
)
router.get("/users", 
    ensureAuthenticated, 
    listUsersController.handle
)


export {
    router
}