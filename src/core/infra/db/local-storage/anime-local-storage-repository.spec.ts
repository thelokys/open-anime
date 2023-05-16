import { Anime, AnimeProps } from "@/core/domain/entities/anime.entity";
import { AnimeLocalStorageRepository } from "./anime-local-storage.repository";
import { LocalStorageMock } from "./local-storage-mock";
let tempStorage = global.localStorage;
global.localStorage = new LocalStorageMock();

describe("AnimeLocalStorageRepository Test", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterAll(() => {
    global.localStorage = tempStorage;
  });

  it("deve conseguir inserir um novo anime", async () => {
    const repository = new AnimeLocalStorageRepository();

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
    const repository = new AnimeLocalStorageRepository();
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
