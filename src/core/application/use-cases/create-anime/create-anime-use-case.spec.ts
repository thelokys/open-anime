import { AnimeInMemoryRepository } from "@/core/infra/db/in-memory/anime-in-memory.respository";
import { CreateAnimeUseCase } from "./create-anime.use-case";

describe("CreateAnimeUseCase Tests", () => {
  const animeRepo = new AnimeInMemoryRepository();
  it("Deve conseguir criar um anime", async () => {
    const createAnime = new CreateAnimeUseCase(animeRepo);

    const output = await createAnime.execute({
      coverImage: "coverImage",
      progress: "10",
      title: "title",
      totalEpisodes: "20",
    });

    expect(output).toEqual(
      expect.objectContaining({
        coverImage: "coverImage",
        progress: "10",
        title: "title",
        totalEpisodes: "20",
        id: expect.any(String),
      })
    );
  });
});
