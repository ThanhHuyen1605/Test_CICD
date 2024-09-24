/// <reference types="cypress" />

describe('EA Web App Testing with network interception', () => {

  beforeEach('Navigate to EA Web App', () => {
    cy.visit('http://localhost:8000')
    cy.fixture('response').then(jsonData => {

      cy.wrap(jsonData).as('requestBody');
      cy.log(JSON.stringify(jsonData));

      cy.intercept('POST', "/Product/Edit/*", (req) => {
        //This works
        //req.body="Name=Test+hijacked+Product&Description=Test+hijacked+Description&Price=400000&__Invariant=Price&ProductType=PERIPHARALS&__RequestVerificationToken=CfDJ8NZOeh3lXiJDtRbY4axJPwkt4v4QqcWtD2Fj48eaM9kAE5IbbYf0_N40MqA1Ll2J6vJKgNcSipwVWkEs6sp1Q9DHqQgyTW6lOQqfFAWTrJ71gCEzdqjCAWCV3kxPqvX26kc_BTDFeapsVrYoYQkyQas";
        
        //This doesn't work
        req.body = JSON.stringify(jsonData);
        req.continue();
      }).as('Product');


    });



    cy.contains('Product').click()
  });

  it('Edit first Product but the values are hijacked', () => {
    cy.get('[href="/Product/Edit/2"]').click()
    cy.get('#Name').clear().type('Test Product', { waitForAnimations: true });
    cy.get('#Description').clear().type('Test Description', { waitForAnimations: true });

    cy.get('.btn').then(($request) => {
      $request.trigger('click');
      cy.wait('@Product');
    });

    //cy.get('.btn').click();
    // verify that the page was navigated to Product/List
    cy.url().should('include', 'Product/List');
  })
})