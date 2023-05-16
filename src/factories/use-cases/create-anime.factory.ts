import { CreateAnimeUseCase } from "@/core/application/use-cases/create-anime/create-anime.use-case";
import { databaseFactory } from "../database/database-factory";

export const registerCreateAnime = () =>
  new CreateAnimeUseCase(databaseFactory());
