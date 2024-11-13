 import Category from '#models/category'
import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import drive from '@adonisjs/drive/services/main'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const query = Product.query().orderBy('price')
    
    const products = await query.paginate(page, limit)

    return view.render('pages/products/index', { products })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    const categories = await Category.all()
    
    return view.render('pages/products/create', { categories })
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)
    
    const key = `uploads/${cuid()}.${payload.image.extname}`
    await payload.image.moveToDisk(key)

    const fileUrl = await drive.use().getUrl(key)

    const { name, price, description, categoryId } = payload
    const product = await Product.create({name, price, description, categoryId, image: fileUrl})

    return response.redirect().toRoute('products.show', { id: product.id })
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.load('category')

    return view.render('pages/products/show', { product })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}