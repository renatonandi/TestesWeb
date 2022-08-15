describe('Banco CRUD',() =>{

    before(() => {
        cy.visit('http://localhost:4200/banco');
    });

    it('Criar Banco', () => {
        cy.get('[data-test="banco-open-form"]').click();
        cy.get('[data-test="banco-form-codigo"]').type("888");
        cy.get('[data-test="banco-form-nome"]').type("Banco Teste 888");
        cy.get('[data-test="banco-form-tipo"]')
        .click()
        .find('ul li > span')
        .contains('Banco de Desenvolvimento')
        .click();
        cy.get('[data-test="banco-form-submit"] > .p-button-label').click();
        cy.get('.p-dialog-header-close-icon').click();
    

    });
    it('Editar Banco', () => {
        cy.get(':nth-child(1) > .text-center > .mr-2').click();
        cy.get('[data-test="banco-form-codigo"]').type("{selectAll}666");
        cy.get('[data-test="banco-form-nome"]').type("{selectAll}Banco Alterado");
        cy.get('[data-test="banco-form-tipo"]')
        .click()
        .find('ul li > span')
        .contains('Banco de Investimento')
        .click();
        cy.get('[data-test="banco-form-submit"] > .p-button-label').click();


    });
    it('Excluir Banco', () => {
        cy.get(':nth-child(1) > .text-center > .ml-2').click();
        cy.get('.p-button-danger').click();



    });
} )
