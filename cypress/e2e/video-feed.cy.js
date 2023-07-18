describe('Video Feed', () => {
  let videoTitle;
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  })

  context('videos: ', () => {
    it('click video cover -> go to correct player detail page', () => {
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

      // click first video
      cy.getBySel("videoTitle")
        .first()
        .invoke('text')
        .then((text) =>{
          videoTitle = text;
        })
      cy.getBySel("videoUrl").first().click();

      // on video player detail
      cy.getBySel("videoPlayer").should('be.visible');
      cy.intercept({
        method: 'GET',
        url: /https:\/\/googleads\.g\.doubleclick\.net\/.*/,
      }, (req) => {
        req.reply({}) // Empty response to ignore the request
      })
      cy.intercept('GET', 'https://www.youtube.com/*').as('youtubeRequests')
      cy.wait('@youtubeRequests') 

      // // verify video title match
      cy.getBySel("videoPlayerTitle")
        .invoke('text')
        .then((text) =>{
          const videoPlayerTitle = text;
          expect(videoTitle).to.equal(videoPlayerTitle)
        })

    })
  })

})