describe('dia',()=>{
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
    cy.get('[href="/inventory"] > .MuiListItemText-root > .MuiTypography-root').click()
                cy.url().should('eq','http://localhost:5173/inventory')
    ///cy.get('.MuiDataGrid-row--lastVisible > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton')
    ///cy.get('[data-id="4"]').click()
    cy.wait(10000)
    cy.reload()
    cy.get('[data-id="3"] > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton').click()
    
  ///cy.get("#toggle-detail-pane-button").click();
  ///cy.get('[value-"viewbutton"]').click()
    ///cy.get('[data-id="2"] > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton').click()
    //cy.get('[data-id="2"] > .MuiDataGrid-cell--withRenderer > .cellAction > .viewbutton')
    ///cy.wait(1000)
    ///cy.get('[data-id="100003"] > [data-field="action"] > .cellAction > .viewbutton').click()
    //cy.get('[data-id="2"] > .MuiDataGrid-cell--withRenderer>.viewbutton').click()
    //cy.get('[data-id="viewbutton"]').click()
    })
})