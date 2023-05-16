import { Plus } from "lucide-react";
import { Anime } from "@/core/domain/anime/anime.entity";

type RenderItemProps<T> = { item: T; index: number };

type AnimeListProps = {
  onClickAdd: () => void;
  data: Anime[];
  renderItem: (props: RenderItemProps<Anime>) => JSX.Element;
};

export const AnimeList = ({ onClickAdd, data, renderItem }: AnimeListProps) => {
  return (
    <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
      <div
        className="rounded p-4 w-[220px] h-[360px] flex flex-col justify-center items-center border-zinc-500 border-2"
        key={"button-add"}
      >
        <button
          onClick={onClickAdd}
          className="p-4 rounded-full bg-[#845EC2] hover:bg-[#845EC2]/70 "
        >
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Plus />
          </div>
        </button>
      </div>

      {data?.map((item, index) => renderItem({ item, index }))}
    </div>
  );
};
