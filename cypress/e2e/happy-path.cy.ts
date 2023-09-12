describe("Happy-path from search a podcast to listen an episode", () => {
  before(() => {
    cy.intercept("https://api.allorigins.win/*").as("getEpisodes");
    cy.intercept(
      "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
    ).as("getTopPodcasts");
    cy.clearLocalStorage();
  });

  it("user can search a podcast, navigate to episodes list and play an episode", () => {
    // user can visist homepage
    cy.visit("/");
    cy.wait("@getTopPodcasts");

    // user can search a podcast
    cy.get("input").type("rock music");

    // user should see the filtered podcasts
    cy.get("main a", { timeout: 500 }).should("have.length", 1);

    // user can click on the podcast card and navigate to episodes list
    cy.get("main a").first().click();

    // redirect to podcast page detail
    cy.location("pathname").should("include", "/podcast");

    // podcast page detail should have h1 with podcast title
    cy.get("h1")
      .eq(1)
      .should("have.text", "A History of Rock Music in 500 Songs");

    // podcast page datil should have a list of episodes
    cy.wait("@getEpisodes");
    cy.get("table");

    // user can click on the first episode and navigate to episode detail
    cy.get("table a").first().click();

    // redirect to episode page detail
    cy.location("pathname").should("include", "/episode");

    // episode should has an audio player
    cy.get("audio").should("have.attr", "src");
  });
});
