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
       cy.wait(1000)
       cy.visit("http://localhost:5173/maindashboard")
       cy.get('[href="/psd"] > .MuiListItemText-root > .MuiTypography-root').click()
       cy.get('.MuiGrid-container > :nth-child(3) > .MuiButtonBase-root').click()
       cy.get('.MuiGrid-container > :nth-child(5)').type("50.00")
       cy.get('.MuiDialogActions-root > .MuiButtonBase-root').click()
         cy.on('window:alert', (text) => {
            expect(text).to.contains('Please fill in all required fields.')
        })   
})
})




