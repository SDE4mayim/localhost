describe('open',() =>{
    it('verify',() =>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(2) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
           cy.url().should("eq","http://localhost:5173/signin")
        cy.get(".justify-center > :nth-child(3)").click()
        cy.get('.text-gray-400.text-center').should("contains.text","Don’t have a hospital account? Sign up")
        cy.get("#username").type("srivathsandv249")
        cy.get("#password").type("1SDE@mayimD")
        cy.get(".btn").click()
        cy.get('.MuiAlert-message').should("contain.text","Profile not found.")
        cy.get('.text-gray-400.text-center > .text-purple-600').click()
         cy.url().should("eq","http://localhost:5173/signup")
    })
}
)