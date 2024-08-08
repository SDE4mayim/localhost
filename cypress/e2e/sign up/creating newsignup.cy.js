describe('second',()=>{
    it('first',()=>{
        cy.visit(' http://localhost:5173/')
        cy.get('.aos-init > .btn').click()
        cy.get('#username').type("visrutha")
        cy.get('#first-name').type("US")
        cy.get('#last-name').type("visrutha")
        cy.get('#hospitalCategory').select("Animal Hospitals")
        cy.get(':nth-child(6) > .w-full > .react-tel-input > .form-control').type("123456789")
        cy.get(':nth-child(7) > .w-full > .react-tel-input > .form-control').type("987654321")
        cy.get('#email').type("xyz@mayim")
        cy.get('#password').type("xyz@123")
        cy.get('#address').type("xyz@kammalar street")
        cy.get('#country').select("India")
        cy.get('#state').select ("Tamil Nadu")
        cy.get('#city').select("Dharmapuri")
        cy.get('#pincode').type("636808")
        cy.get('.mt-6 > .px-3').click()

    })
})




