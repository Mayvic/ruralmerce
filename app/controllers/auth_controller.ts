import type { HttpContext } from '@adonisjs/core/http'
import { createAuthValidator } from '#validators/auth'
import User from '#models/user'

export default class AuthController {
    create({ view }: HttpContext) {
        return view.render('pages/login')
    }

    async store({ auth, request, response, session }: HttpContext) {
        try {
            const payload = await request.validateUsing(createAuthValidator)
            
            const user = await User.verifyCredentials(payload.email, payload.password)
            await auth.use('web').login(user)
        } catch(exception) {
            session.flashOnly(['email'])
            session.flash({ errors: { login: 'Credenciais inválidas.' }})
            return response.redirect().back()
        }
        return response.redirect().toRoute('products.index')
    }

    async destroy({ auth, response }: HttpContext) {
        await auth.use('web').logout()

        return response.redirect().toRoute('home')
    }
}