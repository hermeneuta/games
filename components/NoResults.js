const NoResults = () => {
  return (
    <div className="max-w-sm m-auto space-y-2 sm:max-w-md py-10">
      <div className="text-lime-600 font-semibold tracking-wide">
        Brak wyników
      </div>
      <div className="text-sm text-zinc-900 tracking-wide">
        Spróbuj ponownie zmieniając kryteria wyszukiwania
      </div>
    </div>
  );
};

export default NoResults;
