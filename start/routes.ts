/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const AuthController = () => import('#controllers/auth_controller')
const ProductsController = () => import('#controllers/products_controller')

router.on('/').render('pages/home').as('home')

router.get('/login', [AuthController, 'create']).as('auth.create')
router.post('/login', [AuthController, 'store']).as('auth.store')
router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy')

router.get('/user', [UsersController, 'create']).as('users.create')
router.post('/user', [UsersController, 'store']).as('users.store')
router.get('/user/profile', [UsersController, 'edit']).use(middleware.auth()).as('users.edit')
router.put('/user/profile', [UsersController, 'update']).use(middleware.auth()).as('users.update')

router.group(() => {
    router.get('/products', [ProductsController, 'index']).as('products.index')
    router.get('/products/new', [ProductsController, 'create']).as('products.create')
    router.get('/products/:id', [ProductsController, 'show']).as('products.show')
    router.post('/products', [ProductsController, 'store']).as('products.store')
    router.delete('/products/:id', [ProductsController, 'destroy']).as('products.destroy')
}).use(middleware.auth())