import 'cypress-xpath';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


    Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://clientapp.narola.online:1196/'); // Visit the login page
    cy.get('#userName').type(email); // Enter email
    cy.get('#password').type(password); // Enter password
    cy.wait(3000);
    cy.get("#selectedTenantId").click({force:true});
    cy.get('.e-popup-open > .e-content > #selectedTenantId_options > #selectedTenantId_0').click();
    cy.get("button[type='ButtonType.Submit']").click(); // Click login button
  
    });

    Cypress.Commands.add('logout', () => {
        cy.xpath("//label[normalize-space()='PA']")
        .should('be.visible')
        .click();
        cy.xpath("//p[@class='user-logout-link']//a[@class='menu-with-icon']").click();
         
    });


 

  


    
 

  
  