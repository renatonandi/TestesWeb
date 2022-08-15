
var id = '';

describe('Banco CRUD', () => {
  it('Consulta TODOS OS BANCOS', () => {
    cy.request('GET', '/banco').then(
      (response) => {
        console.log(response.body);
        expect(response).property('status').to.equal(200);
        expect(response.body.length).eq(62);

      }
    )
  })
  it('Cadastra banco POR API', () => {

    cy.request({
      method: 'POST',
      url:  '/banco',
      form: false,
      body: {
        codigo: 999,
        nome: "BANCO TESTE 999",
        tipo: "MULTIPLO"
      }
    }).then(
      (response) => {
        console.log(response.body);
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('codigo', 999);
        expect(response.body).to.have.property('nome', 'BANCO TESTE 999');
        expect(response.body).to.have.property('tipo', 'MULTIPLO');
        id = response.body.id;

  
      }
    ) 
  });
  it('Edita Banco POR API', () =>{

    cy.request({
      method: 'PUT',
      url:  '/banco/' + id,
      form: false,
      body: {
        codigo: 666,
        nome: "BANCO ALTERAÇÃO TESTE 666",
        tipo: "MULTIPLO"
      }
    }).then(
      (response) => {
        console.log(response.body);
        expect(response).property('status').to.equal(200);
        expect(response.body).to.have.property('codigo', 666);
        expect(response.body).to.have.property('nome', 'BANCO ALTERAÇÃO TESTE 666');
        expect(response.body).to.have.property('tipo', 'MULTIPLO');

      }
    )

  });
  it('Exclui Banco POR API', () =>{

    cy.request({
      method: 'DELETE',
      url:  '/banco/' + id,
      form: false
      
    }).then(
      (response) => {
        console.log(response.body);
        expect(response).property('status').to.equal(200);
        
      }
    )

  })
})

