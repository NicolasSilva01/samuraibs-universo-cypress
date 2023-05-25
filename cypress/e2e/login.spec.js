import LoginPage from '../support/Pages/Login'

describe('Login', function() {

    context('Quando o usuário é muito bom', function(){

        const user = {
            email: 'jassa@samurai.com',
            password: 'pwd123'
        }

        it('Deve logar com sucesso', function(){
            LoginPage.go()
            LoginPage.form(user)
            LoginPage.submit()
        })

    })
})