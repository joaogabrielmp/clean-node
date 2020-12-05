import { AddAccount, AddAccountModel, AccountModel } from './db-add-account-protocols'
import { AddAccountRepository } from '../../../data/protocols/db/account/add-account-repository'
import { Hasher } from '../../../data/protocols/criptography/hasher'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.hasher = hasher
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))

    return account
  }
}
