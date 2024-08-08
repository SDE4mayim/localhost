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
    cy.get('[href="/csd"] > .MuiListItemText-root > .MuiTypography-root').click()
    cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
    cy.get('.MuiGrid-root > .MuiTypography-root').click()
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(1)').type('67676767677')
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(2)').type('fghjkl')
    cy.get('.MuiDialogContent-root > .MuiGrid-container > :nth-child(3)').type('qwertyuiop')
    cy.get('.MuiGrid-container > :nth-child(5)').click()
    cy.get('[data-value="male"]').click()
    cy.get('.MuiGrid-container > :nth-child(6)').type('0987612345')
    cy.get('.MuiGrid-container > :nth-child(7)').type('0987612345')
    cy.get('.MuiGrid-container > :nth-child(8)').type('12344@gmail.com')
    cy.get('.MuiGrid-container > :nth-child(9)').type("2023-07-09")
    cy.get('.MuiGrid-container > :nth-child(10)').type('chinnur')
    cy.get('.MuiGrid-container > :nth-child(11)').click()
    cy.get('[data-value="IN"]').click()
    cy.get('.MuiGrid-container > :nth-child(12)').click()
    cy.get('[data-value="TN"]').click()
    cy.get('.MuiGrid-container > :nth-child(13)').click()
    cy.get('[data-value="Dharmapuri"]').click()
    cy.get('.MuiGrid-container > :nth-child(14)').click()
    cy.get('.MuiGrid-container > :nth-child(14)').type('100910')
    cy.get('.MuiGrid-container > :nth-child(16)').click()
    cy.get('[data-value="300004"]').click()
    cy.get('[data-testid="SaveIcon"]').click()


   /// cy.get('.MuiGrid-container > :nth-child(11)').click()
      ///cy.get('[data-value="In"]').click()







    })
})