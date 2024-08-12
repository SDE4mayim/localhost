describe('editing',()=>{
    it('editing',()=>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(2) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
           cy.url().should("eq","http://localhost:5173/signin")
        cy.get(".justify-center > :nth-child(3)").click()
        cy.get("#username").type("srivathsandv2")
        cy.get("#password").type("1SDE@mayim")
        cy.get(".btn").click()
        cy.wait('1000')
           cy.url().should("eq","http://localhost:5173/maindashboard")

        cy.get('[href="/hsd"]').click()
        cy.get('[data-testid="ArrowDropDownIcon"]').parent().click()
        cy.get('[data-value="10"]').click()
        cy.get('.MuiTablePagination-displayedRows').should("contain",10)
        cy.get('[aria-label="Go to next page"]').click()//page2
        cy.get('.MuiTablePagination-displayedRows').should("contain",20)
        cy.get('[aria-label="Go to next page"]').click()//page3
        cy.get('.MuiTablePagination-displayedRows').should("contain",30)
        cy.get('[aria-label="Go to next page"]').click()//page4
        cy.get('.MuiTablePagination-displayedRows').should("contain",40)
        cy.get('[data-id="100039"] > [data-field="action"]').click()
        cy.get("[data-testid='EditIcon']").click()
        cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(5)').clear().type("srivathsanvathsandv")
        cy.get('.MuiDialogContent-root > :nth-child(2) > :nth-child(6)').type(" D V")
        cy.get(':nth-child(2) > :nth-child(7)').clear().type("DVS")
        cy.get(':nth-child(2) > :nth-child(8)').clear().type(7485963625)
        cy.get(':nth-child(2) > :nth-child(9)').clear()   
        cy.get("[data-testid='SaveIcon']").click()           
    })
})