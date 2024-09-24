/// <reference types="cypress" />

describe('Session Test with EA App', () => {
    const login = (name, password) => {
        cy.session('LoginSession', () => {
            cy.visit('http://eaapp.somee.com');
            cy.get('a[href*="Login"]').click();
            cy.get('#UserName').type(name);
            cy.get('#Password').type(password);
            cy.get('.btn').click();
        });
    };

    beforeEach(() => {
        login('admin', 'password');
        cy.visit('http://eaapp.somee.com')
    });

    it('Navigate Employee Details', function () {
        cy.get('.navbar-collapse > :nth-child(1) > :nth-child(3) > a').click();
        cy.get('.btn-primary').click();
        cy.get('#logoutForm > .nav > :nth-child(2) > a').click();
    });

    it('Navigate Manage Users', function () {
        cy.get('a[href*="Role"]').click();
        cy.get('#logoutForm > .nav > :nth-child(2) > a').click();
    });
});
