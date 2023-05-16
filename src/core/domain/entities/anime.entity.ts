import { v4 as uuidv4 } from "uuid";

export type AnimeProps = {
  title: string;
  coverImage: string;
  totalEpisodes: string;
  progress: string;
};

export class Anime {
  public readonly id: string;
  private props: Required<AnimeProps>;

  constructor(props: AnimeProps, id?: string) {
    this.id = id || uuidv4();

    if (!props) {
      this.props = {} as AnimeProps;
      return;
    }

    this.props = {
      coverImage: props.coverImage,
      progress: props.progress,
      title: props.title,
      totalEpisodes: props.totalEpisodes,
    };
  }

  static create(props: AnimeProps, id?: string) {
    return new Anime(props, id);
  }

  updatePropsWith(anime: AnimeProps): Anime {
    this.title = anime.title;
    this.progress = anime.progress;
    this.totalEpisodes = anime.totalEpisodes;
    this.coverImage = anime.coverImage;
    return this;
  }

  get title(): string {
    return this.props.title;
  }

  private set title(value: string) {
    this.props.title = value;
  }

  get coverImage(): string {
    return this.props.coverImage;
  }

  private set coverImage(value: string) {
    this.props.coverImage = value;
  }

  get totalEpisodes(): string {
    return this.props.totalEpisodes;
  }

  private set totalEpisodes(value: string) {
    this.props.totalEpisodes = value;
  }

  get progress(): string {
    return this.props.progress;
  }

  private set progress(value: string) {
    this.props.progress = value;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
