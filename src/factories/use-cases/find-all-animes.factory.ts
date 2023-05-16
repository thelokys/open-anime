import { databaseFactory } from "../database/database-factory";
import { FindAllAnimesUseCase } from "@/core/application/use-cases/find-all-animes/find-all-animes.use-case";

export const registerFindAllAnime = () =>
  new FindAllAnimesUseCase(databaseFactory());
