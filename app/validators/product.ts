import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
    vine.object({
      name: vine.string().trim(),
      price: vine.number().min(0),
      description: vine.string().trim(),
      categoryId: vine.number(),
      image: vine.file({
        size: '2mb',
        extnames: ['jpeg', 'jpg', 'png'],
      })
    })
  )