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
    cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1)').type('rocky')
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').click()
    cy.get('[data-value="600002"]').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').click()
    cy.get('[data-value="male"]').click()
    cy.get('.MuiGrid-container > :nth-child(4)').type('14')
    cy.get('.MuiGrid-container > :nth-child(5)').type('13')
    cy.get('.MuiGrid-container > :nth-child(6)').click()
    cy.get('[data-value="400004"]').click()
    cy.get('.MuiGrid-container > :nth-child(7)').type('Acana and Orijen')
    cy.get('.MuiGrid-container > :nth-child(8)').click()
    cy.get('[data-value="raw"]').click()
    cy.get('.MuiGrid-container > :nth-child(9)').type('399')
    cy.get('[data-testid="SaveIcon"]').click()
    })
})