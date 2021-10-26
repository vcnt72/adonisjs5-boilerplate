/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResponseEnvelope from 'App/Helper/ResponseEnvelope'
import { ResponseCode } from 'App/Helper/ResponseCode'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor() {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {
    if (error.code === 'E_VALIDATION_FAILURE') {
      const errors = error.messages.errors

      const field = errors[0].field
      const message = errors[0].message
      const errMsg = `${field} ${message}`

      return ctx.response.badRequest(new ResponseEnvelope(ResponseCode.BAD_REQUEST, errMsg))
    }

    if (error.code === 'E_ROUTE_NOT_FOUND') {
      return ctx.response.notFound(
        new ResponseEnvelope(ResponseCode.ROUTE_NOT_FOUND, 'Route not found')
      )
    }

    if (error.status == 500) {
      return ctx.response.internalServerError(
        new ResponseEnvelope(ResponseCode.UNKNOWN_ERROR, 'Unknown Error')
      )
    }

    /**
     * Forward rest of the exceptions to the parent class
     */
    return super.handle(error, ctx)
  }
}
