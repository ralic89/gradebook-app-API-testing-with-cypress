import data from '../fixtures/data.json'

class LoginClass {
    
    get emailInput () {
         return cy.get ('#email')
    }
    
    get passwordInput () {
       return cy.get ('#userPassword')
    }

    get loginBtn () {
       return cy.get ('button[type="submit"]')
    }

    loginFunc () {
    this.emailInput.type(data.validCredentials.email)
    this.passwordInput.type(data.validCredentials.password)
    this.loginBtn.click()
}

}

export const loginClass = new LoginClass ()