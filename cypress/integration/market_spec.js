describe('market page', function () {
  it('title is correct', function () {
    cy.visit('http://localhost:3000/')
    cy.get('tr').find('button').each(function ($el, index, $list) {
      $el.click()
    })
  })
})