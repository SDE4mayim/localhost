describe('newuser',()=>{
    it('two user',()=>{
        cy.visit(' http://localhost:5173/')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.grow > :nth-child(2) > .font-medium').click()
              cy.url().should('eq',"http://localhost:5173/signin")
        cy.get('.justify-center > :nth-child(3)').click()
        cy.get('#username').type('srivathsandv2')
        cy.get('#password').type('1SDE@mayim')  
        cy.get('.btn').click()
        cy.visit("http://localhost:5173/maindashboard")
        
        })              
    })





