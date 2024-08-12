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
        cy.get('[href="/maindashboard"] > .MuiListItemText-root > .MuiTypography-root').click()
     
          cy.url().should('eq','http://localhost:5173/maindashboard')
    cy.get('[href="/hsd"] > .MuiListItemText-root > .MuiTypography-root').click()
    cy.url().should('eq','http://localhost:5173/hsd')
    cy.get('[data-id="100001"] > [data-field="action"] > .cellAction > .viewbutton').click()
    cy.get('[data-testid="EditIcon"]').click()
    cy.get('[data-testid="DeleteIcon"]').click()
    ///cy.get('input[type="submit"]').click();
      // fire event with method on
      ///cy.on('window:alert',(t)=>{
         //assertions
         ///expect(t).to.contains('Failed to delete the profile** to include ');
      ///})
      
    })
})