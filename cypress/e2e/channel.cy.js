describe('channel', () => {
    beforeEach(() => {
        cy.visit('/');
      })
      
    context('feed', () => {
        it('display channel detail from channel card', () => {
            // click 2nd menu find channel card
            let secondMenu;
            let feedTitle;
            let channelTitle;
      
            cy.getBySel("categories")  
              .first()
              .next()
              .should(($element) => {
                $element.click();
                secondMenu = $element.text();
            })
            // cy.wait(10000)
            cy.getBySel("feedTitle").should(($element) => {
              feedTitle = $element.text();
              expect(feedTitle).to.include(secondMenu);
            })
            cy.getBySel("channelCard").within(() => {
                cy.getBySel("channelLink").should(($element) => {
                    const hrefValue = $element.attr('href');
                    const regex = /\/channel\/([^\/]+)$/;
                    expect(hrefValue).to.match(regex);
                })                
            })
            cy.getBySel("cardContent").within(() => {
                cy.getBySel('channelThumbnail').should('be.visible')
                cy.getBySel('subscriberCount').should('be.visible')              
                cy.getBySel("channelTitle").should(($element) => {
                    channelTitle = $element.text();
                }) 
            })
            // click on channel card
            cy.getBySel("channelLink").click()
       
            // expect channel detail page display
            cy.getBySel('channelDetailCover').should('be.visible') 
            cy.getBySel('cardContent').within(() => {
                cy.getBySel('channelThumbnail').should('be.visible') 
                cy.getBySel('channelTitle').should('be.visible') 
                cy.getBySel('CheckCircleIcon').should('be.visible') 
                cy.getBySel('subscriberCount').should('be.visible') 
            })
        });

        it('display channel detail from video title on video card', () => {
            let channelTitle;

            cy.getBySel('channelTitle')
                .first()
                .should(($element) => {
                    channelTitle = $element.text();
            });
            cy.getBySel('channelTitle').first().click();
            
            cy.getBySel("channelCard").within(() => {
                cy.getBySel("channelLink").should(($element) => {
                    const hrefValue = $element.attr('href');
                    const regex = /\/channel\/([^\/]+)$/;
                    expect(hrefValue).to.match(regex);
                })                
            })

            // expect channel detail page display
            cy.getBySel('channelDetailCover').should('be.visible') 
            cy.getBySel('cardContent').within(() => {
                cy.getBySel('channelThumbnail').should('be.visible') 
                cy.getBySel('channelTitle').should('be.visible') 
                cy.getBySel('CheckCircleIcon').should('be.visible') 
                cy.getBySel('subscriberCount').should('be.visible') 
            })           
        }) 
    })

    context('search result', () => {
        it('display channel detail from channel card', () => {
            const searchKeyword = 'peppa';
            let channelTitle;

            cy.visit(`/search/${searchKeyword}`)
            cy.getBySel('searchResultTitle').should(($el) => {
                expect($el.text()).to.be.include(searchKeyword); 
            })

            cy.getBySel("channelCard").within(() => {
                cy.getBySel("channelLink").should(($element) => {
                    const hrefValue = $element.attr('href');
                    const regex = /\/channel\/([^\/]+)$/;
                    expect(hrefValue).to.match(regex);
                })                
            })

            cy.getBySel("cardContent").within(() => {
                cy.getBySel('channelThumbnail').should('be.visible')
                cy.getBySel('subscriberCount').should('be.visible')              
                cy.getBySel("channelTitle").should(($element) => {
                    channelTitle = $element.text();
                }) 
            })
            // click on channel card
            cy.getBySel("channelLink").click()
       
            // expect channel detail page display
            cy.getBySel('channelDetailCover').should('be.visible') 
            cy.getBySel('cardContent').within(() => {
                cy.getBySel('channelThumbnail').should('be.visible') 
                cy.getBySel('channelTitle').should('be.visible') 
                cy.getBySel('CheckCircleIcon').should('be.visible') 
                cy.getBySel('subscriberCount').should('be.visible') 
            })
        });
        
        it('display channel detail from video title on video card', () => {
            const searchKeyword = 'cooking';
            let channelTitle;

            cy.visit(`/search/${searchKeyword}`)
            cy.getBySel('searchResultTitle').should(($el) => {
                expect($el.text()).to.be.include(searchKeyword); 
            })

            cy.getBySel("videoInfo").first().within(() => {
                cy.getBySel("channelTitle").should(($element) => {
                    const hrefValue = $element.attr('href');
                    const regex = /\/channel\/([^\/]+)$/;
                    expect(hrefValue).to.match(regex);
                })                
            })

            cy.getBySel("channelTitle").should(($element) => {
                channelTitle = $element.text();
            }) 
            // click on channel card
            cy.getBySel("channelTitle").first().click()
       
            // expect channel detail page display
            cy.getBySel('channelDetailCover').should('be.visible') 
            cy.getBySel('cardContent').within(() => {
                cy.getBySel('channelThumbnail').should('be.visible') 
                cy.getBySel('channelTitle').should('be.visible') 
                cy.getBySel('CheckCircleIcon').should('be.visible') 
                cy.getBySel('subscriberCount').should('be.visible') 
            })


        });
    })

})




