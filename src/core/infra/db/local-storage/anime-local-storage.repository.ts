import { Anime } from "@/core/domain/entities/anime.entity";
import { AnimeRepositoryInterface } from "@/core/domain/repositories/anime.repository";

export class AnimeLocalStorageRepository implements AnimeRepositoryInterface {
  private readonly KEY_STORAGE = "@openAnime:list";
  private items: Anime[] = [];

  /** Singleton */
  private static instance: AnimeLocalStorageRepository;
  private constructor() {
    const rawItemsStorage = localStorage.getItem(this.KEY_STORAGE);
    const parsedItems = JSON.parse(rawItemsStorage ?? "[]") as Anime[];
    this.items = parsedItems.map((item) => new Anime(item, item.id));
  }
  public static getInstance(): AnimeLocalStorageRepository {
    if (!AnimeLocalStorageRepository.instance) {
      AnimeLocalStorageRepository.instance = new AnimeLocalStorageRepository();
    }
    return AnimeLocalStorageRepository.instance;
  }
  /** Fim do Singleton */

  async store(entity: Anime): Promise<Anime> {
    this.items.push(entity);

    const stringfyEntity: string = JSON.stringify(this.items);
    localStorage.setItem(this.KEY_STORAGE, stringfyEntity);
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

    localStorage.setItem(this.KEY_STORAGE, JSON.stringify(this.items));
  }

  async getById(id: string): Promise<Anime | undefined> {
    return this.items.find((item) => item.id === id);
  }
}
