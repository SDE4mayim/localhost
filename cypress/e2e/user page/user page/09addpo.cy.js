describe('editing',()=>{
    it('editing',()=>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(2) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
           cy.url().should("eq","http://localhost:5173/signin")
        cy.get(".justify-center > :nth-child(3)").click()
        cy.get("#username").type("srivathsandv2")
        cy.get("#password").type("1SDE@mayim")
        cy.get(".btn").click()
           cy.url().should("eq","http://localhost:5173/maindashboard")
        cy.reload()
        cy.get('[href="/csd"]').click()
        cy.get(':nth-child(4) > .MuiButtonBase-root').click()
        //fail
    })
})