Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test-id=${selector}]`, ...args);
  });

Cypress.Commands.add('getVideoPlayerTitle',  (callback) => {
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

    // return title of that video from video player
    cy.getBySel("videoPlayerTitle")
      .invoke('text')
      .then((text) =>{
        callback(text);
      })
});

Cypress.Commands.add('getFirstVideoTitleFromVideoList',  (elements, callback) => {
    cy.getBySel(elements)
    .first()
    .invoke('text')
    .then((text) =>{
      callback(text);
  })
});