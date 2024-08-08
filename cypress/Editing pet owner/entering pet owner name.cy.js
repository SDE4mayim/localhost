describe('open',() =>{
    it('verify',() =>{
        cy.visit(' https://localhost:5173/')
        cy.get('.grow > :nth-child(2) > .font-medium').click()  
        
            cy.url().should('eq','http://lochost:5173/signin') 
        cy.get('.justify-center > :nth-child(3)').click()
        cy.get('.w-full > .text-gray-400').contains("Hospitals and clinics can use this login")
        cy.get('#username').type("srivathsandv2")
        cy.get('#password').type("1SDE@mayim")
        cy.get('.btn').click()
        cy.wait(1000)
        cy.visit("http://localhost:5173/maindashboard")
        cy.get('[href="/csd"] > .MuiListItemText-root > .MuiTypography-root').click()
        cy.url().should('eq','https://localhost:5173/csd')
        cy.get('#search').type("Krish")
        cy.get('.MuiGrid-container > :nth-child(2) > .MuiButtonBase-root').click()   
    })
})











