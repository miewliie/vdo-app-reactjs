describe('Video Feed', () => {
 
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  context('navbar: ', () => {
    it('should display logo -> with href value "/" ', () => {
      cy.getBySel("pathUrl").should(($element) => {
        const hrefValue = $element.attr('href');
        expect(hrefValue).to.equal('/');
      })
    })

    it('should display search bar', () => {
      cy.getBySel("searchBox").within(() => {
        cy.getBySel("searchBar").should('have.attr', 'placeholder', 'Search...');
        cy.getBySel("searchIcon").should('be.visible');
      });
    })
  })

  context('sidebar: ', () => {
    it('should display sidebar with 1st menu highlight rgb(252, 21,3) ', () => {
      let redColor = 'rgb(252, 21, 3)';
      cy.getBySel("categories")  
      .first()
      .should('have.css', 'background-color', redColor);
    })

    it('should click 2nd category -> expect feed title equal category name', () => {
      let secondMenu;
      let feedTitle;

      cy.getBySel("categories")  
        .first()
        .should('have.text', 'New')
        .next()
        .should(($element) => {
          $element.click();
          secondMenu = $element.text();
        })
      cy.getBySel("feedTitle").should(($element) => {
        feedTitle = $element.text();
        expect(feedTitle).to.include(secondMenu);
      })
    })

  })

  context('videos: ', () => {
    it('should display video feed', () => {
      cy.getBySel("feedTitle").contains('New videos');
      cy.getBySel("videoUrl").should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /\/video\/([^\/]+)$/;
        expect(hrefValue).to.match(regex);
      })

      cy.getBySel("checkIcon").should('be.visible');
      cy.getBySel("channelTitle").should(($element) => {
        const hrefValue = $element.attr('href');
        const regex = /\/channel\/([^\/]+)$/;
        expect(hrefValue).to.match(regex);
      })

    })
  })

})