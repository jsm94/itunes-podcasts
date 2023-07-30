import { ApiPodcastService } from "../infra/ApiPodcastService";
import { mockData } from "../infra/mocks/mockData";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  }),
) as jest.Mock<Promise<Response>>;

describe("ApiPodcastService", () => {
  describe("getMostPopular", () => {
    it("should return a list of podcasts", async () => {
      const apiPodcastService = new ApiPodcastService();
      const podcasts = await apiPodcastService.getMostPopular(1);
      expect(podcasts).toHaveLength(1);
    });
  });
});
