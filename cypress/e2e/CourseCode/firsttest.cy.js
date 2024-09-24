/// <reference types="cypress" />

describe('EA Web App Testing', () => {

  beforeEach('Navigate to EA Web App', () => {
    cy.visit('http://localhost:8000')
    cy.contains('Product').click()
  });

  it('Edit first Product', () => {
    cy.get('[href="/Product/Edit/2"]').click()
    cy.get('#Name').clear().type('Test Product', { waitForAnimations: true });
    cy.get('#Description').clear().type('Test Description', { waitForAnimations: true });
    cy.get('.btn').click();

    // verify that the page was navigated to Product/List
    cy.url().should('include', 'Product/List');
    
  })

  it('Verify specific product instead of first one', () => {
    cy.get('.table')
      .find('td')
      .contains('Headphones')
      .parent()
      .contains('Edit')
      .click();
    cy.get('#Name').should('have.value', 'Headphones');
    cy.get('#Description').parent().should('have.class', 'form-group');
    //Using Invoke method to get the value
    cy.get('#Description').invoke('val').should('contain', 'Noise cancellation');
  })




})