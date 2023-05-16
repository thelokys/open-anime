import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";
import { UpdateOneAnimeInput } from "./update-one-anime-use-case.interface";
import { Anime } from "@/core/domain/entities/anime.entity";

export class UpdateOneAnimeUseCase {
  constructor(private readonly animeRepo: AnimeRepositoryInterface) {}

  async execute(anime: UpdateOneAnimeInput): Promise<void> {
    const animeInDb = await this.animeRepo.getById(anime.id);

    if (!animeInDb) {
      throw Error("Anime não encontrado");
    }

    animeInDb.updatePropsWith(anime);

    await this.animeRepo.update(animeInDb);
  }
}
