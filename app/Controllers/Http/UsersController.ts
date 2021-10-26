import Hash from '@ioc:Adonis/Core/Hash'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ResponseCode } from 'App/Helper/ResponseCode'
import ResponseEnvelope from 'App/Helper/ResponseEnvelope'
import User from 'App/Models/User'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class UsersController {
  public async logout({ response, auth }: HttpContextContract) {
    await auth.use('api').revoke()
    return response.ok(new ResponseEnvelope(ResponseCode.SUCCESS, 'Success'))
  }

  public async login({ request, response, auth }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email(), rules.required()]),
      password: schema.string({}, [rules.minLength(10), rules.maxLength(254), rules.required()]),
      role: schema.string({}, [rules.exists({ table: 'roles', column: 'code' }), rules.required()]),
    })

    const { email, password, role } = await request.validate({
      schema: validationSchema,
    })

    try {
      const user = await User.query()
        .preload('role')
        .where('email', email)
        .whereHas('role', (query) => {
          return query.where('code', role)
        })
        .first()

      if (user == null) {
        return response.conflict(
          new ResponseEnvelope(ResponseCode.DATA_NOT_FOUND, 'User tidak ditemukan')
        )
      }

      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest(
          new ResponseEnvelope(ResponseCode.BAD_CREDENTIALS, 'Bad Credentials')
        )
      }

      const tokenContract = await auth.use('api').generate(user, {
        expiresIn: '1days',
        role: user.role.code,
      })

      const token = tokenContract.token

      return response.ok(
        new ResponseEnvelope(ResponseCode.SUCCESS, 'Success').withData({
          user: user.serialize(),
          token,
        })
      )
    } catch (error) {
      return response.internalServerError(
        new ResponseEnvelope(ResponseCode.UNKNOWN_ERROR, 'Unknown Error')
      )
    }
  }
}
