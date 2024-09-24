/// <reference types="cypress" />

describe('EA Web App Testing', {retries: {
  runMode: 2,
  openMode: 4
}}, () => {

  beforeEach('Navigate to EA Web App', () => {
    cy.visit('http://localhost:8000')
    cy.intercept({
      method:'POST',
      url:"/Product/Edit/*",
    }).as('Product');
    cy.contains('Product').click()
  });

  it('Edit first Product and verify network response with Intercept and Alias', () => {
    cy.get('[href="/Product/Edit/2"]').click()
    cy.get('#Name').clear().type('Test Product', { waitForAnimations: true });
    cy.get('#Description').clear().type('Test Description', { waitForAnimations: true });

    cy.get('.btn').then(($request) => {
      $request.trigger('click');

      //single assertion
      //cy.wait('@Product').its('request.body').should('contain', 'Test+Product');

      //multiple assertions
      cy.wait('@Product').then(($response) => {
        expect($response.response.statusCode).to.equal(302);
        expect($response.request.body).to.contain('Test+Product');
        expect($response.request.body).to.contain('Test+Description');
      });

    });

    // verify that the page was navigated to Product/List
    cy.url().should('include', 'Product/List');
  })

  it('With Wrap', () => {

    cy.get('.table')
    .find('tr > td')
    .contains('Headphones')
    .parent()
    .as('currentRow')
    

    cy.get('@currentRow').then(($currentRow) => {
      
      cy.log($currentRow)

    });
   
   

  });

})