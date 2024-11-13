 import Category from '#models/category'
import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

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
    console.log('request received')
    const payload = await request.validateUsing(createProductValidator)
    console.log('payload validated')
    const product = await Product.create(payload)

    console.log('product created')

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