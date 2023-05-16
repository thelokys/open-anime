import { Anime } from "@/core/domain/entities/anime.entity";
import {
  CreateAnimeInput,
  CreateAnimeOutput,
} from "./create-anime-user-case.interface";
import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";

export class CreateAnimeUseCase {
  constructor(private readonly animeRepo: AnimeRepositoryInterface) {}

  async execute(input: CreateAnimeInput): Promise<CreateAnimeOutput> {
    const anime = new Anime(input);
    await this.animeRepo.store(anime);
    return anime.toJSON();
  }
}
