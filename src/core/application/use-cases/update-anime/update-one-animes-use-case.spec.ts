import { AnimeInMemoryRepository } from "@/core/infra/db/in-memory/anime-in-memory.respository";
import { CreateAnimeUseCase } from "../create-anime/create-anime.use-case";
import { UpdateOneAnimeUseCase } from "./update-one-anime.use-case";
import { fail } from "assert";
import { FindOneAnimeUseCase } from "../find-one-anime/find-one-anime.use-case";

describe("UpdateOneAnimeUseCase Tests", () => {
  const animeRepo = new AnimeInMemoryRepository();

  it("Deve receber mensagem de erro por não ter encontrado o anime", async () => {
    const updateOneAnime = new UpdateOneAnimeUseCase(animeRepo);

    try {
      await updateOneAnime.execute({ id: "some-id" } as any);

      fail("Deveria ocorrer uma exceção de não encontrado");
    } catch (error: any) {
      expect(error.message).toBe("Anime não encontrado");
    }
  });

  it("Deve conseguir atualizar o anime cadastrado", async () => {
    const createAnime = new CreateAnimeUseCase(animeRepo);

    const animeInDb = await createAnime.execute({
      coverImage: "",
      progress: "",
      title: "",
      totalEpisodes: "",
    });

    const updateOneAnime = new UpdateOneAnimeUseCase(animeRepo);

    const animeUpdated = {
      ...animeInDb,
      title: "novo titulo",
    };

    await updateOneAnime.execute(animeUpdated);

    const findOneAnime = new FindOneAnimeUseCase(animeRepo);
    const output = await findOneAnime.execute(animeInDb.id);

    expect(output).toStrictEqual(animeUpdated);
  });
});
