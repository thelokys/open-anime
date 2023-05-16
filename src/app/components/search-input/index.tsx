type SearchInputProps = {
  value: string;
  onChangeText: (searchText: string) => void;
  placeholder: string;
};

export const SearchInput = ({
  value,
  onChangeText,
  placeholder,
}: SearchInputProps) => {
  return (
    <input
      type="text"
      className="w-full md:w-96 bg-zinc-700 text-sm border-zinc-800 h-10 px-10 placeholder-zinc-400 rounded-lg focus:outline-none text-center"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeText(e.target.value)}
    />
  );
};
