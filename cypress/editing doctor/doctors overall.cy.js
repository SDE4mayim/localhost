describe('user',()=>{
    it('name',()=>{
    cy.visit(' http://localhost:5173/')
    cy.get('.grow > :nth-child(2) > .font-medium').click()
    cy.get('.justify-center > :nth-child(3)').click()
cy.get('#username').type('naveen')
cy.get('#password').type('NAVEEn@3445')
cy.get('.btn').click()
cy.wait(500)
cy.reload()
cy.get('[href="/dsd"] > .MuiListItemText-root > .MuiTypography-root').click()
             cy.url().should('eq','http://localhost:5173/dsd')
cy.get('[href="/dsd"] > .MuiListItemText-root > .MuiTypography-root')
cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1)').type('dhoniprakesh g')
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').type('dhoni@0987')
cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').type('dhoni')
cy.get('.MuiGrid-container > :nth-child(4)').type('Dhoni')
cy.get('.MuiGrid-container > :nth-child(5)').click()
cy.get('[data-value="male"]').click()
cy.get(':nth-child(6) > .react-tel-input > .form-control').type('1234567890')
cy.get(':nth-child(7) > .react-tel-input > .form-control').type('0987654321')
cy.get('.MuiGrid-container > :nth-child(8)').type('dhoni0987@mail.com')
cy.get('.MuiGrid-container > :nth-child(9)').click()

cy.get('.MuiGrid-container > :nth-child(9)').click()
cy.get('.MuiGrid-container > :nth-child(9)').type("2008-08-29")
cy.get('.MuiGrid-container > :nth-child(10)').type('34/23-1 chinnur')
cy.get(':nth-child(11) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="IN"]').click()
cy.get(':nth-child(12) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="TN"]').click()
cy.get(':nth-child(13) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
cy.get('[data-value="Dharmapuri"]').click()
cy.get('.MuiGrid-container > :nth-child(14)').type('636810')
cy.get('.MuiGrid-container > :nth-child(15)').click()
cy.get('[data-testid="SaveIcon"]').click()
cy.get('[data-id="300001"] > [data-field="action"] > .cellAction > .viewbutton').click()
cy.get('[data-testid="EditIcon"]').click()
cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(4)').clear().type('naveen dinesh')
cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(5)').clear().type('naveen')
cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(6)').clear().type('dinesh')
cy.get(':nth-child(2) > :nth-child(7)').click()
cy.get('[data-value="male"]').click()
cy.get(':nth-child(2) > :nth-child(8)').clear().type('09876544321')
cy.get(':nth-child(2) > :nth-child(9)').clear().type('1234567890')
cy.get(':nth-child(2) > :nth-child(10)').clear().type('naveen@345')
cy.get('[data-testid="DeleteIcon"]').click()
    })
 })
