import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user'

import { dd } from '@adonisjs/core/services/dumper'
import logger from '@adonisjs/core/services/logger'

export default class UsersController {
    index() {
        // TODO
    }
    
    create({ view }: HttpContext) {
        return view.render('pages/users/create')
    }
    
    async store({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createUserValidator)
        
        const user = new User()
        user.merge(payload)

        await user.save()

        return response.redirect().toRoute('auth.create')
    }
    
    edit({ view }: HttpContext) {
        return view.render('pages/users/edit')
    }
    
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