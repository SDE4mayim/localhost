describe('open',() =>{
    it('verify',() =>{
        cy.visit(' http://localhost:5173/')
        cy.get(".btn-sm").click()
        cy.title().should("eq","VET CASTLE")
         cy.url().should("eq","http://localhost:5173/signup")
    })
}
)