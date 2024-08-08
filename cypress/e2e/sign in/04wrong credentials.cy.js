describe('open',() =>{
    it('verify',() =>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(2) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
           cy.url().should("eq","http://localhost:5173/signin")
        cy.get(".justify-center > :nth-child(3)").click()
        cy.get("#username").type("srivathsandv2")
        cy.get("#password").type("1SDE@ayim")
        cy.get(".btn").click()
        cy.get('.MuiAlert-message').should("contain.text","Invalid credentials")
    })
})