describe('open',() =>{
    it('verify',() =>{
       cy.visit(' http://localhost:5173/')
       cy.get('.grow > :nth-child(2) > .font-medium').click()
       
            cy.url().should('eq','http://lochost:5173/signin')
       cy.get('.w-full > .text-gray-400').should('contain','Pet Owners can use this login')
       cy.get('.justify-center > :nth-child(3)').click()
       cy.get('#username').type('srivathsandv2')
       cy.get('#password').type('1SDE@mayim')
       cy.get('.btn').click()
      //  cy.wait(1000)
      //  cy.reload()
       //cy.get('[href="/psd"] > .MuiListItemText-root > .MuiTypography-root').click()
       cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
      // cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1) ').type("Rosie")
    //    cy.get(':nth-child(3) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
    //    cy.get('[data-value="female"]').click()
    //    cy.get('.MuiGrid-container > :nth-child(5)').type("50.00")
    //    cy.get('.MuiGrid-container > :nth-child(7)').type("wiskes")
    //    cy.get('.MuiGrid-container > :nth-child(9)').type(100)
    //    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').click()
    //    cy.get('[data-value="600008"]').click() 
    //    cy.get('.MuiGrid-container > :nth-child(4)').type(10)
    //    cy.get('.MuiGrid-container > :nth-child(6)').click()
    //    cy.get('[data-value="400001"]').click()
    //    cy.get(':nth-child(8) > .MuiFormControl-root > .MuiInputBase-root > .MuiSelect-select').click()
    //    cy.get('[data-value="raw"]').click()
       cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()
    })
})

//fail case

