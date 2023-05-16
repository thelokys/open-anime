import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";
import { FindAllAnimeOutput } from "./find-all-animes-use-case.interface";

export class FindAllAnimesUseCase {
  constructor(private readonly animeRepo: AnimeRepositoryInterface) {}

  async execute(): Promise<FindAllAnimeOutput[]> {
    const animes = await this.animeRepo.getAll();
    return animes.map((anime) => anime.toJSON());
  }
}
