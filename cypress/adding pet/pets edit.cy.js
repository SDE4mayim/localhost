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
    cy.get('[href="/psd"] > .MuiListItemText-root > .MuiTypography-root').click()
    cy.get('[data-id="500012"] > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton').click()
    cy.get('[data-testid="EditIcon"]').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').clear().type('scooby')
    cy.get('.MuiGrid-container > :nth-child(4)').clear().type('13')
    cy.get('.MuiGrid-container > :nth-child(5)').clear().type('15')
    cy.get('.MuiGrid-container > :nth-child(7)').clear().type('2023-09-08')
    cy.get('.MuiGrid-container > :nth-child(8)').clear().type('2022-09-08')
    cy.get('.MuiGrid-container > :nth-child(9)').clear().type('any one')
    cy.get('.MuiGrid-container > :nth-child(10)').clear().type('345')
    cy.get(':nth-child(11) > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('[data-value="male"]').click()
    cy.get(':nth-child(12) > .MuiInputBase-root > .MuiSelect-select').click()
    cy.get('[data-value="raw"]').click()
    cy.get('[data-testid="SaveIcon"]').click()
    })
})