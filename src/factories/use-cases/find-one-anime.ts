import { FindOneAnimeUseCase } from "@/core/application/use-cases/find-one-anime/find-one-anime.use-case";
import { databaseFactory } from "../database/database-factory";

export const registerFindOneAnime = () =>
  new FindOneAnimeUseCase(databaseFactory());
