describe('dia',()=>{
    it('gonis',()=>{
    cy.visit(' http://localhost:5173/')
    cy.get('.grow > :nth-child(2) > .font-medium').click()
    cy.get('.justify-center > :nth-child(3)').click()
    cy.get('#username').type('naveen')
    cy.get('#password').type('NAVEEn@3445')
    cy.get('.btn').click()
    cy.wait(1000)
    cy.reload()
    cy.get('.MuiToolbar-root > .MuiTypography-root').click()
     
          cy.url().should('eq','http://localhost:5173/maindashboard')
    cy.get('[href="/diagnosis"] > .MuiListItemText-root > .MuiTypography-root').click()
                 cy.url().should('eq','http://localhost:5173/diagnosis')
    cy.get('[data-id="11000007"] > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton').click()
    cy.get('[data-testid="EditIcon"]').click()
  cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').clear().type('what to do')
  cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').should('contain.text','Diagnosis Date')
  cy.get('.MuiGrid-container > :nth-child(3)').clear().type('12@#$%^0987')
  cy.get('.MuiGrid-container > :nth-child(3)').should('contain.text','Diagnosis Note')
  cy.get('[data-testid="SaveIcon"]').click()





    })
})