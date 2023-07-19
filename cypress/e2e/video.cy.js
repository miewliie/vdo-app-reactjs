describe('video scenarios', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/');
      })

    context.only('feed: ', () => {
        let videoTitle;

        it('click first video to video player', () => {
    
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

        it('click first video of 3rd category to video player', () => {
          let thirdCat;

          cy.getBySel("categories")  
          .first()
          .next()
          .next()
          .should(($element) => {
            thirdCat = $element.text();
            $element.click();
          })
          cy.wait(5000)
          cy.getBySel("videoUrl").first().click()

          cy.getVideoPlayerTitle((returnvalue) => {
              expect(returnvalue).to.include(thirdCat);
          })
        });
      })



})
