import { AnimeInMemoryRepository } from "@/core/infra/db/in-memory/anime-in-memory.respository";
import { CreateAnimeUseCase } from "../create-anime/create-anime.use-case";
import { AnimeProps } from "@/core/domain/entities/anime.entity";
import { FindOneAnimeUseCase } from "./find-one-anime.use-case";
import { fail } from "assert";

describe("FindOneAnimesUseCase Tests", () => {
  const animeRepo = new AnimeInMemoryRepository();
  it("Deve receber mensagem de erro por não ter encontrado o anime", async () => {
    const findOneAnime = new FindOneAnimeUseCase(animeRepo);

    try {
      await findOneAnime.execute("some-id");
      fail("Deveria ocorrer uma exceção de não encontrado");
    } catch (error: any) {
      expect(error.message).toBe("Anime não encontrado");
    }
  });

  it("Deve conseguir encontrar o anime cadastrado", async () => {
    const createAnime = new CreateAnimeUseCase(animeRepo);
    const findOneAnime = new FindOneAnimeUseCase(animeRepo);

    const firstAnime = await createAnime.execute({
      coverImage: "",
      progress: "",
      title: "",
      totalEpisodes: "",
    });

    const output = await findOneAnime.execute(firstAnime.id);
    expect(output).toStrictEqual(firstAnime);
  });
});
