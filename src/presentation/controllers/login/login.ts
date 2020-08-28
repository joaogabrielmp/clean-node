import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, serverError } from '../../helpers/http-helper'
import { MissingParamError, InvalidParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }

      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }

      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
