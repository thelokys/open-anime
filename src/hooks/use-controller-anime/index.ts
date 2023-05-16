import { useEffect, useState } from "react";
import { FormData } from "@/app/components/modal";

import {
  registerCreateAnime,
  registerFindAllAnime,
  registerUpdateAnime,
} from "@/factories/use-cases";

type AnimeData = {
  id?: string;
  title: string;
  coverImage: string;
  progress: string;
  totalEpisodes: string;
};

export const useControllerAnime = () => {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  const [editAnime, setEditAnime] = useState<AnimeData>();

  const fetchAnimes = () => registerFindAllAnime().execute().then(setAnimes);

  const submitEditAnime = async (input: FormData) => {
    if (!input.id) {
      return;
    }

    setAnimes((prevState) => {
      return prevState.map((item) => {
        if (item.id === input.id) {
          return { ...item, ...input };
        } else {
          return item;
        }
      });
    });

    await registerUpdateAnime().execute({ id: input.id, ...input });
  };

  const submitNewAnime = async (input: FormData) => {
    await registerCreateAnime()
      .execute(input)
      .then((data) => {
        setAnimes((prevState) => [...prevState, data]);
      });
  };

  const handleClickAnime = (item?: AnimeData, callback?: () => void) => {
    setEditAnime(item);
    callback?.();
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  return {
    animes,
    editAnime,
    handleClickAnime,
    fetchAnimes,
    submitNewAnime,
    submitEditAnime,
  };
};
