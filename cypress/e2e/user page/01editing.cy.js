describe('editing',()=>{
    it('editing',()=>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(2) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
        cy.get(".justify-center > :nth-child(3)").click()
        cy.get("#username").type("srivathsandv2")
        cy.get("#password").type("1SDE@mayim")
        cy.get(".btn").click()
           cy.url().should("eq","http://localhost:5173/signin")
           cy.url().should("eq","http://localhost:5173/maindashboard")
        // cy.reload()
        // cy.get('[href="/hsd"]').click()
        // cy.get('[data-id="100001"] > [data-field="action"] > .cellAction > .viewbutton').click()
        //cy.get(' ."MuiButtonBase-root MuiIconButton-root MuiIconButton-colorPrimary MuiIconButton-sizeMedium edit_profile css-39nlm1[type="Button"]').click()
        /*cy.get(".MuiButtonBase-root").then($placeCards => {
            const starred = $placeCards.filter(':has[data-testid="EditIcon"]')
             .last().index()
            const notStarred = $placeCards.not(':has[data-testid="EditIcon"]')
             .first().index()
            
             expect(starred).to.be.lessThan(notStarred)

            cy.get("[data-testid='EditIcon']").click()
         })*/
         //cy.get("[data-testid='EditIcon']").click()
    })
})