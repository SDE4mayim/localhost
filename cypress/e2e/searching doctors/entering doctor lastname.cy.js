describe('open',() =>{
    it('verify',() =>{


       cy.visit(' http://localhost:5173/')
       cy.get('.grow > :nth-child(2) > .font-medium').click()
       
            cy.url().should('eq','http://lochost:5173/signin')
       cy.get('.w-full > .text-gray-400').should('contain','Pet Owners can use this login')
       cy.get('.justify-center > :nth-child(3)').click()
       cy.get('#username').type("srivathsandv2")
       cy.get('#password').type("1SDE@mayim")
       cy.get('.btn').click()
      cy.visit("http://localhost:5173/maindashboard")
       cy.get('[href="/dsd"] > .MuiListItemText-root > .MuiTypography-root').click()
       cy.get('[data-id="300001"] > [data-field="action"] > .cellAction > .viewbutton').click()
       cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(5)').type("christopher")
       cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(5)').clear().type("christopher")



      })
})