import { makeLoginValidation } from './login-validation-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login/login-controller'
import { makeDbAuthenticaiton } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthenticaiton(), makeLoginValidation())
  return makeLogControllerDecorator(controller)
}
