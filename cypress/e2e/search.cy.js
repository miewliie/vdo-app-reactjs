describe('Search scenarios', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('empty search: should not able to search', () => {
        cy.getBySel('searchBar').type('{enter}')
        cy.getBySel('feedTitle').should(($el) => {
            expect($el.text()).to.be.include('New videos')
        })
    });

    //   search with keyword should able to search
    it('keyword: should able to search', () => {
        const keyword = 'home design';

        cy.getBySel('searchBar').type(`${keyword} {enter}`)
        cy.getBySel('searchResultTitle').should(($el) => {
            expect($el.text()).to.be.include(`${keyword} videos`)
        })
    });

    // search with special char should able to search
    it('special char: should able to search', () => {
        const keyword = '@';

        cy.getBySel('searchBar').type(`${keyword} {enter}`)
        cy.getBySel('searchResultTitle').should(($el) => {
            expect($el.text()).to.be.include(`${keyword} videos`)
        })
    });

    // search by click on {searchIcon}
    it('click {searchIcon}: should able to search', () => {
        const keyword = 'flowers';

        cy.getBySel('searchBar').type(`${keyword}`)
        cy.getBySel('searchIcon').click()
        cy.getBySel('searchResultTitle').should(($el) => {
            expect($el.text()).to.be.include(`${keyword} videos`)
        })
    });


})
