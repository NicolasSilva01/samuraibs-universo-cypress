import Sinup from '../support/Pages/Sinup'
import signupPage from '../support/Pages/Sinup'

describe('Cadastro', function () {

  context('Quando o usuário é novato', function () {

    const user = {
      name: 'João Lucas',
      email: 'joao@samuraibs.com',
      password: 'pdw123',
      is_provider: true
    }

    before(function () {
      cy.task('removeUser', user.email).then(function (result) {

        console.log(result)

      })

    })

    it('Deve cadastrar um novo usuário', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.Toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

    })

  })

  context('Email já cadastrado', function () {

    const user = {
      name: 'João Lucas',
      email: 'joao@samuraibs.com',
      password: 'pdw123',
      is_provider: true
    }

    before(function () {

      cy.task('removeUser', user.email).then(function (result) {

        console.log(result)

      })

      cy.request('POST', 'http://localhost:3333/users', user)
        .then(function (response) {
          expect(response.status).to.eq(200)
        })

    })

    it('Deve exibir email já cadastrado', function () {

      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.Toast.shouldHaveText('Email já cadastrado para outro usuário.')

    })

  })

  context('Quando o email é incorreto', function() {
    const user = {
      name: 'Elizabeth Olsen',
      email: 'liza.yahoo.com',
      password: 'pdw123',
      is_provider: true
    }

    it('Deve exibir mensagem de alerta', function() {
      signupPage.go()
      signupPage.form(user)
      signupPage.submit()
      signupPage.alertHaveText('Informe um email válido')
    })
  })

  context('Quando a senha é menor que 6 caracteres', function() {

    const passwords = ['1', '12', '123', '1234', '12345']

    beforeEach(function() {
      signupPage.go()
    })

    passwords.forEach(function(p) {
      it('Não deve cadastrar com a senha' + p, function() {
        const user = {name: 'Jason Friday', email: 'jason@gmail.com', password: p}
        signupPage.form(user)
        signupPage.submit()
      })
    })

    afterEach(function() {
      signupPage.alertHaveText('Pelo menos 6 caracteres')
    })
  })

  context('Quando não preencho nenhum dos campos', function() {

    const alertMessages = [
      'Nome é obrigatório',
      'E-mail é obrigatório', 
      'Senha é obrigatória'
    ]

    beforeEach(function(){
      signupPage.go()
      signupPage.submit()
    })

    alertMessages.forEach(function(alert) {
      it('Deve exibir ' + alert, function() {
        signupPage.alertHaveText(alert)
      })
    })
  })

})

