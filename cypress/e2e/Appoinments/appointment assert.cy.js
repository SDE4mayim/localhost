describe('user',()=>{
    it('name',()=>{
    cy.visit(' http://lochost:5173/')
    cy.get('.grow > :nth-child(2) > .font-medium').click()
    cy.get('.justify-center > :nth-child(3)').click()
    cy.get('#username').type('naveen')
    cy.get('#password').type('NAVEEn@3445')
    cy.get('.btn').click()
    cy.wait(1000)
    cy.reload()
    cy.get('.MuiToolbar-root > .MuiTypography-root').click()   
    cy.url().should('eq','http://lochost:5173/maindashboard')
    cy.get('[href="/asd"] > .MuiListItemText-root > .MuiTypography-root').click()
    cy.url().should('eq','http://lochost:5173/asd')
    cy.get('[data-id="800005"] > .MuiDataGrid-cell--withRenderer').click()
    cy.get('[data-testid="EditIcon"]').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').click()
     cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').clear()
     cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').type('2024-04-45')
     cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').should('contain.text','Appointment Date')
     cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').clear().type('DO OR DIE')
     cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').should('contain.text','Appointment Notes')
     cy.get('.MuiDialogActions-root > .MuiGrid-container > :nth-child(2) > :nth-child(1)').click()
    
     cy.on('window:alert', (text) => {
     expect(text).to.contains('Appoinments updated sucessfully.')
    })
    })
})
