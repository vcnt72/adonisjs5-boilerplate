import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/users/login', 'UsersController.login')
  Route.post('/users/logout', 'UsersController.logout')
}).prefix('api')
