import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

export default class UsersController {
    index() {
        // TODO
    }
    
    //renderiza a pagina de criar user
    create({ view }: HttpContext) {
        return view.render('pages/users/create')
    }
    
    //cria um user
    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createUserValidator)
        
        const user = new User()
        user.merge(payload)

        await user.save()

        return response.redirect().toRoute('auth.create')
    }
    
    //renderiza a pagina de editar user
    edit({ view }: HttpContext) {
        return view.render('pages/users/edit')
    }
    
    //edita um user
    async update({ request, response, session }: HttpContext) {
        const payload = await request.validateUsing(createUserValidator)
        const user = await User.findByOrFail('email', payload.email)
        user.merge(payload)
    
        await user.save()
    
        session.flash('notification', {
            type: 'success',
            message: 'Usuário atualizado!',
            description: 'Informações do usuário salvas com sucesso.'
        })
        
        return response.redirect().toRoute('users.edit')
    }
}