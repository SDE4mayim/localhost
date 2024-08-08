describe('open',() =>{
    it('verify',() =>{
        cy.log("visit the website")
        cy.visit(' http://localhost:5173/')
        cy.title().should('eq','VET CASTLE')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.btn-sm').click()
        cy.url().should('eq','https://vetcastle.com/signup')
        cy.get('.border-b-2').click()
        cy.get('.text-white-400').should('contain','Ideal for small practices with 1 Hospital and up to 2 Doctors')
       
        
    })
    it('verify',() =>{
        cy.log("visit the website")
        cy.visit(' http://localhost:5173/')
        cy.title().should('eq','VET CASTLE')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.btn-sm').click()
        cy.url().should('eq','https://vetcastle.com/signup')
        cy.get(':nth-child(2) > .text-gray-600').click()
        cy.get('.text-white-400').should('contain','Suitable for practices with 2 Hospitals and up to 10 Doctors')
       
        
    })
    it('verify',() =>{
        cy.log("visit the website")
        cy.visit(' http://localhost:5173/')
        cy.title().should('eq','VET CASTLE')
     cy.url().should('eq','http://localhost:5173/')
        cy.get('.btn-sm').click()
        cy.url().should('eq','https://vetcastle.com/signup')
        cy.get('.justify-center > :nth-child(3)').click()
        cy.get('.text-white-400').should('contain','Perfect for large practices with Unlimited Hospitals and Doctors.')
       
        
    })
    
}
)