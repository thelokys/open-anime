import Image from "next/image";

type AnimeCardData = {
  id: string;
  title: string;
  progress: string;
  totalEpisodes: string;
  coverImage: string;
};

type AnimeCardProps = {
  data: AnimeCardData;
  onClick: (item: AnimeCardData) => void;
};

export const AnimeCard = ({ data, onClick }: AnimeCardProps) => {
  return (
    <div
      className="flex flex-col rounded relative bg-white/5 hover:bg-white/10 cursor-pointer w-[220px] h-[360px]"
      key={data.id}
      onClick={() => onClick(data)}
    >
      <img
        src={data.coverImage}
        alt="Bocchi the Rock!"
        className="h-[260px] w-full"
        height={260}
        width={220}
      />

      <footer className="h-full p-2 flex flex-col gap-y-2 justify-center items-center">
        <div className="block text-center text-sm">{data.title}</div>
        <div className="block text-center text-sm">
          {data.progress}/{data.totalEpisodes}
        </div>
      </footer>
    </div>
  );
};
