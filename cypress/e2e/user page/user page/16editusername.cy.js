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
        cy.get('[href="/hsd"]').click()
        cy.get('[data-testid="ArrowDropDownIcon"]').parent().click()
        cy.get('[data-value="10"]').click()
        
    })
})


//cy.get('#\:r31\:')
//cy.get('[data-testid="ArrowDropDownIcon"]').children('input[aria-expanded="true"]')
    
        /** Click on the select box, then on the option */
        //cy.get('[data-testid="ArrowDropDownIcon"]').click();
        //cy.get('[role="combobox"]').should('be.visible')
        //cy.get('#\:r1h\: > [tabindex="-1"]').click()
       // cy.get('[role="option"]').children('[data-value="10"]').click()
    
        //cy.get('[data-testid="ArrowDropDownIcon"]').children('input[aria-hidden="true"]').should('have.value', '10');
        //cy.get('[data-testid="ArrowDropDownIcon"]').children().its('length').should('be.equal', 10)
        //cy.get('[id="#:r1f:"] li[role="combobox"]').contains("10").click()
        /*cy.findByRole("options",{
            data-testid : /10/,
        }).click()*/
        //cy.get('[data-id="100001"] > [data-field="action"] > .cellAction > .viewbutton').click()
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