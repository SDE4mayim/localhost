describe('logo',() => {
    it('logo',()  =>{
        cy.visit(' http://localhost:5173/')
        cy.get(".grow > :nth-child(1) > .font-medium").click()
        cy.title().should("eq","VET CASTLE")
        cy.url().should("eq","https://vetcastle.com/pricing")
        cy.get(':nth-child(1) > .btn-sm').click()
        cy.url().should("eq","https://vetcastle.com/gsignup")
        cy.get(".text-gray-400").should("contain.text","Rs.2,000 per month")
        cy.get(".text-red-400").should("contain.text","Special Offer: 50% Discount on Yearly Plans. Pay Only Rs. 12,000 Annually (Originally Rs. 24,000)")
        
    })
 })
 