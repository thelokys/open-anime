export interface RepositoryInterface<TEntity, Key> {
  store(entity: TEntity): Promise<TEntity>;
  getAll(): Promise<TEntity[]>;
  update(entity: TEntity): Promise<void>;
  getById(id: Key): Promise<TEntity | undefined>;
}
