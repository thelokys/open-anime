import { Anime } from "../entities/anime.entity";
import { RepositoryInterface } from "./repository";

export interface AnimeRepositoryInterface
  extends RepositoryInterface<Anime, string> {}
