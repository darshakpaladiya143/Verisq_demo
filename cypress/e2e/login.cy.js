describe('Login and Assessment Template Tests', () => {

    beforeEach(() => {
        cy.fixture('userData').then((data) => {
          cy.login(data.validUser.email, data.validUser.password);
        });
      });
  
    // Run once after all tests in this suite
    // Log out of the application using the custom command
    // after(() => {
    //   cy.logout();
    // });
  
    it('Should navigate to home after login', () => {
      // Verify that after login, the URL includes '/home'
      cy.url().should('include', '/home');
    });
  

    it('Add Assessment Template with Unique Data', () => {

        // Generate a unique template name using the current timestamp
        const uniqueTemplateName = `Test Template Name ${Date.now()}`;
    
        // Ensure we're on the home page after login
        cy.url().should('include', '/home');
    
        // Step 1: Click on "Third-Party Risk Management" element from the homepage
        cy.xpath("//p[contains(@class,'custom-slider-desc')][normalize-space()='Third-Party Risk Management']")
          .should('be.visible')
          .click();
        cy.wait(5000);
    
        // Step 2: Expand the navbar by clicking on the toggle button
        cy.get('button.e-control.e-btn.e-lib.btn-toggle')
          .as('toggleBtn')
          .should('be.visible')
          .click();
        cy.wait(4000);
    
        // Step 3: Navigate to the "Assessment Template" section via the navbar
        cy.xpath("//span[normalize-space()='Manage Template']")
          .should('exist')
          .should('be.visible')
          .click();
    
        // Step 4: Click on the "Create Template" link to open the template creation modal
        cy.xpath("//a[normalize-space()='Create Template']").click();
    
        // Step 5: In the modal, handle template creation with dynamic data
        cy.get('div[class*="custom-modal"]').each(($modal) => {
          cy.wrap($modal).within(() => {
            // Verify that the Template Name input is empty, then type the unique template name
            cy.get('input#TemplateName')
              .should('be.empty')
              .type(uniqueTemplateName);
    
            // Open the Outcome Type dropdown and select an option
            cy.get('input#OutcomeTypeId').parent().click();
            cy.get('ul[role="listbox"] li')
              .contains('Satisfactory/Non-satisfactory')
              .click({ force: true });
    
            // Click the "Create" button to submit the new template
            cy.get('button.e-primary')
              .contains('Create')
              .click();
            cy.wait(5000);

    
            // Step 6: Assert that the new template is added successfully
            cy.get('table tbody tr', { timeout: 20000 })
            .should('have.length.at.least', 1) // Ensure at least one row exists
            .contains('td', uniqueTemplateName) // Find the row containing the template name
            .should('be.visible')
            .parent()
            .within(() => {
              cy.get('span#template-ToolTip').should('have.text', uniqueTemplateName);
            });

          });
        });
      });
    });
  