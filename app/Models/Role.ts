import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Name of the role
  @column()
  public name: string

  // Code of the role
  @column()
  public code: string

  //Type of the role. ex: Koperasi and Basic
  @column()
  public type: string

  @hasMany(() => User)
  public users: HasMany<typeof User>
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
