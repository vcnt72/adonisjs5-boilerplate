import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public fullname: string

  // Email of the user. Being used for login
  @column()
  public email: string

  @column()
  public password: string

  @column()
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
