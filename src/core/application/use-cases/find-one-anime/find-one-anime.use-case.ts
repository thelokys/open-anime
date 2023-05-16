import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";
import { FindOneAnimeOutput } from "./find-one-anime-use-case.interface";

export class FindOneAnimeUseCase {
  constructor(private readonly animeRepo: AnimeRepositoryInterface) {}

  async execute(id: string): Promise<FindOneAnimeOutput> {
    const anime = await this.animeRepo.getById(id);

    if (!anime) {
      throw new Error("Anime não encontrado");
    }

    return anime.toJSON();
  }
}
