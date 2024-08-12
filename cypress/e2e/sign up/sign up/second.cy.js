describe('open',() =>{
    it('verify',() =>{
       cy.visit(' http://localhost:5173/')
       cy.get('.grow > :nth-child(1) > .font-medium').click()
       cy.url().should('eq','https://vetcastle.com/pricing')
       cy.get('.grow > :nth-child(2) > .font-medium').click()
       
            cy.url().should('eq','http://lochost:5173/signin')
      
    })
}
)