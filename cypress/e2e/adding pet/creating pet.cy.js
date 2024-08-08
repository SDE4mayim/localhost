describe('newuser',()=>{
    it('two user',()=>{
        cy.visit(' http://localhost:5173/')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.btn-sm').click()
        cy.get('.justify-center > :nth-child(3)').click()
        cy.get('#username').type("visrutha__us")
        cy.get('#first-name').type("visrutha__us")
        cy.get('#last-name').type('us')
        cy.get('#hospitalCategory').select("Industry and Corporate Settings")
        cy.get(':nth-child(6) > .w-full > .react-tel-input > .form-control').type('1234567891')
        cy.get(':nth-child(7) > .w-full > .react-tel-input > .form-control').type('12345678921')
        cy.get('#email').type('sde4mayim@gmail.com')
        cy.get('#password').type('visrutha12')
        cy.get('#address').type("mayimdazzle")
        cy.get('#country').select("India")
        cy.get('#state').select("Tamil Nadu")
        cy.get('#city').select("Dharmapuri")
        cy.get('#pincode').type("636808")
        cy.get('.btn').click()

    })
}) 

