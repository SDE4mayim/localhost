describe('open',() =>{
    it('verify',() =>{
        cy.log("visit the website")
        cy.visit(' http://localhost:5173/')
        cy.title().should('eq','VET CASTLE')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.aos-init > .btn').click()
        cy.url().should('eq','https://vetcastle.com/signup')
        
    })
}
)