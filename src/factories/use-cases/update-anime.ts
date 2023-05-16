import { databaseFactory } from "../database/database-factory";
import { UpdateOneAnimeUseCase } from "@/core/application/use-cases/update-anime/update-one-anime.use-case";

export const registerUpdateAnime = () =>
  new UpdateOneAnimeUseCase(databaseFactory());
