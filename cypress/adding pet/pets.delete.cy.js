describe('user',()=>{
it('name',()=>{
    cy.visit(' http://localhost:5173/')
    cy.get('.grow > :nth-child(2) > .font-medium').click()
    cy.get('.justify-center > :nth-child(3)').click()
    cy.get('#username').type('naveen')
    cy.get('#password').type('NAVEEn@3445')
    cy.get('.btn').click()
    cy.wait(1000)
    cy.reload()
    cy.get('[href="/maindashboard"] > .MuiListItemText-root > .MuiTypography-root').click()
 
          cy.url().should('eq','http://localhost:5173/maindashboard')
cy.get('[href="/psd"] > .MuiListItemText-root > .MuiTypography-root').click()
              cy.url().should('eq','http://locahlost:5173/psd')
    cy.get('[data-id="500010"] > .MuiDataGrid-cell--withRenderer').click()
    
    cy.get('[data-testid="EditIcon"]').click()
    cy.get('[data-testid="DeleteIcon"]').click()
})
})
