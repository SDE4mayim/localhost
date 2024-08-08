describe('open',() =>{
    it('verify',() =>{
       cy.visit(' http://localhost:5173/')
       cy.get('.grow > :nth-child(2) > .font-medium').click()
       
            cy.url().should('eq','http://lochost:5173/signin')
       cy.get('.justify-center > :nth-child(3)').click()
       cy.get('#username').type('srivathsandv2')
       cy.get('#password').type('1SDE@mayim')
       cy.get('.btn').click()
       cy.wait(1000)
       cy.reload()
       cy.visit("http://localhost:5173/maindashboard")
       cy.get('[href="/dsd"] > .MuiListItemText-root > .MuiTypography-root').click()
                    cy.url().should('eq','http://localhost:5173/dsd')
       cy.get('[data-id="300001"] > [data-field="action"] > .cellAction > .viewbutton').click()
       cy.get('[data-testid="EditIcon"]').click()
       cy.get('.MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
       cy.get('[data-value="female"]').click()
       cy.get('.MuiDialogActions-root > .MuiGrid-container > :nth-child(2) > :nth-child(1)').click()
       cy.on('window:alert', (text) => {
        expect(text).to.contains('Failed to updated Profile ');
    })
    
})
})





