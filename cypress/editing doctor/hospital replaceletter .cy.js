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
cy.get('.MuiToolbar-root > .MuiTypography-root').click()
 
          cy.url().should('eq','http://localhost:5173/maindashboard')
cy.get('[href="/hsd"] > .MuiListItemText-root > .MuiTypography-root').click()
cy.url().should('eq','https://vetcastle.com/hsd')
cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1)').type('5678901234')
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').type('7659')
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').type('0987')
cy.get('.MuiGrid-container > :nth-child(4)').type('@#$%^')
cy.get('.MuiGrid-container > :nth-child(5)').click()
cy.get('[data-value="male"]').click()
cy.get(':nth-child(6) > .react-tel-input > .form-control').type('9344611084')
cy.get(':nth-child(7) > .react-tel-input > .form-control').type('9751372618')
cy.get('.MuiGrid-container > :nth-child(8)').type('344567@#$%^20030807@mail.com')
cy.get('.MuiGrid-container > :nth-child(9)').type("2003-08-07")
cy.get('.MuiGrid-container > :nth-child(10)').type('3/62-1 ')
cy.get(':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="IN"]').click()
cy.get(':nth-child(12) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="TN"]').click()
cy.get(':nth-child(13) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="Dharmapuri"]').click()
cy.get('.MuiGrid-container > :nth-child(14)').type('gchjkghj')
cy.get('.MuiGrid-container > :nth-child(17)').type('345')
cy.get('[data-testid="SaveIcon"]').click()
    })
})