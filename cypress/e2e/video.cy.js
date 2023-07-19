describe('video scenarios', () => {

    beforeEach(() => {
        cy.visit('/');
      })

    context('feed: ', () => {
      
      it('click first video to correct video player', () => {
        let videoTitle;

        cy.getFirstVideoTitleFromVideoList("videoTitle", (returnvalue) => {
          videoTitle = returnvalue;
        })
        cy.getBySel("videoUrl").first().click();

        cy.getVideoPlayerTitle((returnvalue) => {
          expect(returnvalue).to.include(videoTitle);
        })   
      })

      it('click first video of 3rd category to correct video player', () => {
        let thirdCat;

        cy.getBySel("categories")  
        .first()
        .next()
        .next()
        .should(($element) => {
          thirdCat = $element.text();
          $element.click();
        })
        cy.wait(10000)
        cy.getBySel("videoUrl").first().click()

        cy.getVideoPlayerTitle((returnvalue) => {
            expect(returnvalue).to.include(thirdCat);
        })
      });
      })
    
    context('channel detail: ', () => {
        it('click first video to correct video player', () => {
          let videoTitle;

          cy.visit('/channel/UC3IZKseVpdzPSBaWxBxundA')
          cy.getFirstVideoTitleFromVideoList("videoTitle", (returnvalue) => {
            videoTitle = returnvalue;
          })
          cy.getBySel("videoUrl").first().click();

          cy.getVideoPlayerTitle((returnvalue) => {
            expect(returnvalue).to.include(videoTitle);
          })  
        });

    })

    context('search results: ', () => {
        it('click first video to correct video player', () => {
          let videoTitle;

          cy.visit('/search/cooking')
          cy.getFirstVideoTitleFromVideoList("videoTitle", (returnvalue) => {
            videoTitle = returnvalue;
          })
          cy.getBySel("videoUrl").first().click();

          cy.getVideoPlayerTitle((returnvalue) => {
            expect(returnvalue).to.include(videoTitle);
          })  
        });
    })


})
