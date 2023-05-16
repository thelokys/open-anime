import React, { FormEvent, useCallback, useRef, useState } from "react";
import { X } from "lucide-react";

export type FormData = {
  id?: string;
  title: string;
  progress: string;
  coverImage: string;
  totalEpisodes: string;
};

type ModalProps = {
  isVisible?: boolean;
  onRequestClose: () => void;
  onSubmit: (data: FormData) => void;
  initialValues?: FormData;
};

const defaultValues = {
  title: "",
  progress: "",
  coverImage: "",
  totalEpisodes: "",
} as FormData;

export const Modal = ({
  isVisible,
  onRequestClose,
  onSubmit,
  initialValues = defaultValues,
}: ModalProps) => {
  if (!isVisible) return null;

  const [formData, setFormData] = useState<FormData>(initialValues);

  const handleCloseModal = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { id } = event.target as HTMLInputElement;

      if (id === "backdrop") {
        onRequestClose();
      }
    },
    []
  );

  const handleOnSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      onSubmit(formData);
      onRequestClose();
    },
    [formData]
  );

  const handleChange = useCallback((event: any) => {
    const value = event.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: value,
    }));
  }, []);

  return (
    <div
      className="absolute inset-0 bg-black bg-opacity-25 backdrop-blur-sm pt-20 flex flex-col items-center"
      id="backdrop"
      onClick={handleCloseModal}
    >
      <div className="w-[600px] bg-zinc-900 flex flex-col p-4 rounded">
        <button
          className="text-white text-xl place-self-end"
          onClick={onRequestClose}
        >
          <X size={18} />
        </button>
        <div className="flex flex-row gap-x-4 items-center">
          <div className="w-[180px] h-[240px] border-1 bg-zinc-600">
            <img
              src="https://cdn.myanimelist.net/images/anime/1956/126621.jpg"
              alt="cover da image do input de texto"
              className="w-full h-full"
            />
          </div>
          <form className="flex flex-col gap-y-4" onSubmit={handleOnSubmit}>
            <div>
              <label htmlFor="title" className="text-sm">
                Título
              </label>
              <input
                type="text"
                className="w-full text-zinc-300 bg-zinc-700 text-sm border-zinc-800 h-10 px-2 rounded focus:outline-none"
                name="title"
                value={formData.title}
                onChange={handleChange}
                id="title"
              />
            </div>

            <div className="flex flex-row gap-x-4 items-center">
              <div className="flex flex-1 flex-col">
                <label htmlFor="progress" className="text-sm">
                  Progresso
                </label>
                <input
                  type="text"
                  className="w-full text-zinc-300 bg-zinc-700 text-sm border-zinc-800 h-10 px-2 rounded focus:outline-none"
                  name="progress"
                  id="progress"
                  value={formData.progress}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="episodes" className="text-sm">
                  Episódios
                </label>
                <input
                  type="text"
                  className="w-full text-zinc-300 bg-zinc-700 text-sm border-zinc-800 h-10 px-2 rounded focus:outline-none"
                  name="totalEpisodes"
                  id="totalEpisodes"
                  value={formData.totalEpisodes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="coverImage" className="text-sm">
                Image de cover
              </label>
              <input
                type="text"
                className="w-full text-zinc-300 bg-zinc-700 text-sm border-zinc-800 h-10 px-2 rounded focus:outline-none"
                name="coverImage"
                id="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
              />
            </div>
            <footer className="flex flex-row justify-between mt-4">
              <button
                type="button"
                className="bg-zinc-800  hover:bg-zinc-800/70 rounded py-2 px-4"
                onClick={onRequestClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-[#845EC2] font-semibold rounded py-2 px-8 hover:bg-[#845EC2]/70 "
              >
                {formData?.id ? "Atualizar" : "Salvar"}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};
