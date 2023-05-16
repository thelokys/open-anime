import { AnimeLocalStorageRepository } from "@/core/infra/db/local-storage/anime-local-storage.repository";

export const databaseFactory = () => AnimeLocalStorageRepository.getInstance();
