import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    const role = await Role.query().where('code', 'SUPERUSER').first()

    const password = await Hash.make('1meja-Admin#123')

    const user = await User.create({
      fullname: 'superuser',
      email: 'admin@admin.com',
      password,
    })
    if (role != null) {
      await user.related('role').associate(role)
    }
  }
}
