
describe('first',()=>{
   it('second',()=>{
      cy.visit(' http://localhost:5173/')
      cy.get('.grow > :nth-child(2) > .font-medium').click()
      cy.get('.justify-center > :nth-child(3)').click()
  cy.get('#username').type('naveen')
  cy.get('#password').type('NAVEEn@3445')
  cy.get('.btn').click()
  cy.wait(1000)
  cy.reload()
  cy.visit("http://localhost:5173/maindashboard")
  cy.url().should('eq',"http://localhost:5173/maindashboard")
  cy.get('[href="/csd"] > .MuiListItemText-root > .MuiTypography-root').click()
  cy.url().should('eq','http://localhost:5173/csd')
  cy.get('[data-id="400001"] > [data-field="action"] > .cellAction > .viewbutton').click()
  cy.get('[data-testid="EditIcon"]').click()
  cy.get('[data-testid="DeleteIcon"]').click()
})

})