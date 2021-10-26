import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'code'
    // Write your database queries inside the run method
    await Role.updateOrCreateMany(uniqueKey, [
      {
        code: 'SUPERUSER',
        name: 'Super User',
        type: 'ADMIN',
      },
    ])
  }
}
