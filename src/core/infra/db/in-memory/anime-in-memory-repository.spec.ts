import { Anime, AnimeProps } from "@/core/domain/entities/anime.entity";
import { AnimeInMemoryRepository } from "./anime-in-memory.respository";

describe("AnimeInMemoryRepository Test", () => {
  it("deve conseguir inserir um novo anime", async () => {
    const repository = new AnimeInMemoryRepository();

    const animeProps: AnimeProps = {
      title: "titulo",
      progress: "10",
      totalEpisodes: "20",
      coverImage: "http://",
    };

    const anime = Anime.create(animeProps);

    const createdAnime = await repository.store(anime);
    const animes = await repository.getAll();

    expect(animes).toHaveLength(1);
    expect(createdAnime).toStrictEqual(anime);
  });

  it("deve conseguir atualizar um anime existente", async () => {
    const repository = new AnimeInMemoryRepository();
    const animeInsert = {
      title: "titulo",
      progress: "10",
      totalEpisodes: "20",
      coverImage: "http://",
    };

    const animeInDb = await repository.store(Anime.create(animeInsert));

    await repository.update(
      Anime.create(
        {
          ...animeInDb.toJSON(),
          title: "novo titulo",
        },
        animeInDb.id
      )
    );

    const anime = await repository.getById(animeInDb.id);
    const allAnimes = await repository.getAll();

    expect(allAnimes).toHaveLength(1);
    expect(anime).toBeTruthy();
    expect(anime?.title).toStrictEqual("novo titulo");
  });
});
