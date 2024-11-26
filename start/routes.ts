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

//cria as rotas relacionadas a login 
router.get('/login', [AuthController, 'create']).as('auth.create') //pag create login
router.post('/login', [AuthController, 'store']).as('auth.store') //login
router.get('/logout', [AuthController, 'destroy']).use(middleware.auth()).as('auth.destroy') //logout

//cria as rotas relacionadas a user 
router.get('/user', [UsersController, 'create']).as('users.create') //pag create user
router.post('/user', [UsersController, 'store']).as('users.store') //salva um user novo
router.get('/user/profile', [UsersController, 'edit']).use(middleware.auth()).as('users.edit') //pag de edit user
router.put('/user/profile', [UsersController, 'update']).use(middleware.auth()).as('users.update') //edit user

//cria as rotas relacionadas a produto
router.group(() => {
    router.get('/products', [ProductsController, 'index']).as('products.index') //lista prods
    router.get('/products/new', [ProductsController, 'create']).as('products.create') // renderiza a pag de criar prod
    router.get('/products/:id', [ProductsController, 'show']).as('products.show') //renderiza a pagina de um produto
    router.post('/products', [ProductsController, 'store']).as('products.store') //cria prod
    router.delete('/products/:id', [ProductsController, 'destroy']).as('products.destroy') //apaga produto
}).use(middleware.auth())