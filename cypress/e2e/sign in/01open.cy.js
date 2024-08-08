describe('open',() =>{
    it('verify',() =>{
        cy.visit(' http://localhost:5173/')
        cy.title().should("eq","VET CASTLE")
    })
}
)