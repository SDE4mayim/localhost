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
    cy.get('.MuiGrid-root > .MuiButtonBase-root').click()
    cy.get(':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('[data-value="400007"]').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').click()
    cy.get('[data-value="300006"]').click()
    cy.get('.MuiGrid-container > :nth-child(3)').click()
    cy.get('[data-value="500022"]').click()
    cy.get('.MuiGrid-container > :nth-child(4)').type('dbfkghbdhb')
    cy.get('[data-testid="CloseIcon"]').click()
    })
    
    })
    
    
    
    
    