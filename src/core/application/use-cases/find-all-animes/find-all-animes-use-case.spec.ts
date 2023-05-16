import { AnimeInMemoryRepository } from "@/core/infra/db/in-memory/anime-in-memory.respository";
import { FindAllAnimesUseCase } from "./find-all-animes.use-case";
import { CreateAnimeUseCase } from "../create-anime/create-anime.use-case";
import { AnimeProps } from "@/core/domain/entities/anime.entity";

describe("FindAllAnimesUseCase Tests", () => {
  const animeRepo = new AnimeInMemoryRepository();
  it("Deve conseguir listar uma lista vazia", async () => {
    const findAllAnimes = new FindAllAnimesUseCase(animeRepo);
    const output = await findAllAnimes.execute();
    expect(output).toStrictEqual([]);
  });

  it("Deve conseguir listar 2 animes criados", async () => {
    const createAnime = new CreateAnimeUseCase(animeRepo);
    const findAllAnimes = new FindAllAnimesUseCase(animeRepo);
    const anime: AnimeProps = {
      coverImage: "",
      progress: "",
      title: "",
      totalEpisodes: "",
    };

    const firstAnime = await createAnime.execute(anime);
    const secondAnime = await createAnime.execute(anime);
    const output = await findAllAnimes.execute();

    expect(output).toHaveLength(2);
    expect(output).toStrictEqual([firstAnime, secondAnime]);
  });
});
