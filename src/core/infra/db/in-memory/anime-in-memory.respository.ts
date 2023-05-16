import { Anime } from "@/core/domain/entities/anime.entity";
import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";

export class AnimeInMemoryRepository implements AnimeRepositoryInterface {
  private items: Anime[] = [];

  /** Singleton */
  private static instance: AnimeInMemoryRepository;
  private constructor() {}
  public static getInstance(): AnimeInMemoryRepository {
    if (!AnimeInMemoryRepository.instance) {
      AnimeInMemoryRepository.instance = new AnimeInMemoryRepository();
    }
    return AnimeInMemoryRepository.instance;
  }
  /** Fim do Singleton */

  async store(entity: Anime): Promise<Anime> {
    this.items.push(entity);
    return entity;
  }

  async getAll(): Promise<Anime[]> {
    return this.items;
  }

  async update(entity: Anime): Promise<void> {
    this.items = this.items.map((item) => {
      if (item.id === entity.id) {
        return item.updatePropsWith(entity);
      } else {
        return item;
      }
    });
  }

  async getById(id: string): Promise<Anime | undefined> {
    return this.items.find((item) => item.id === id);
  }
}
