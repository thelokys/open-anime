"use client";

import { useState } from "react";

import { Modal } from "./components/modal";

import { useSearchable } from "@/hooks/use-searchable";
import { useToggle } from "@/hooks/use-toggle";
import { SearchInput } from "./components/search-input";
import { AnimeList } from "./components/anime-list";
import { AnimeCard } from "./components/anime-card";
import { useControllerAnime } from "@/hooks/use-controller-anime";

export default function Home() {
  const {
    animes,
    submitNewAnime,
    submitEditAnime,
    editAnime,
    handleClickAnime,
  } = useControllerAnime();
  const [search, setSearch] = useState("");
  const [isModalOpen, toggleModal] = useToggle(false);

  const filteredResults = useSearchable(search, animes, (item) => item.title);

  return (
    <main className="h-screen flex flex-col mx-4">
      <div className="self-center mt-20 w-full flex flex-col items-center mb-10">
        <SearchInput
          value={search}
          placeholder="Busque seu anime"
          onChangeText={setSearch}
        />
      </div>

      <AnimeList
        onClickAdd={toggleModal}
        data={filteredResults}
        renderItem={({ item }) => (
          <AnimeCard
            key={item.id}
            onClick={() => handleClickAnime(item, toggleModal)}
            data={item}
          />
        )}
      />

      <Modal
        isVisible={isModalOpen}
        onRequestClose={() => handleClickAnime(undefined, toggleModal)}
        onSubmit={editAnime?.id ? submitEditAnime : submitNewAnime}
        initialValues={editAnime}
      />
    </main>
  );
}
