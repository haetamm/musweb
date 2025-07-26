import React from 'react';

const SearchNotFound = ({ q }: { q: string }) => {
  return (
    <div className="flex justify-center w-full items-center h-[calc(100vh-280px)] xl:h-[calc(100vh-280px)] px-4">
      <div className="flex-col text-center">
        <p className="text-lg lg:text-xl">
          {`Sorry we didn't find any results for “${q}”.`}
        </p>
        <p className="text-sm lg:text-md">
          Check the spelling, or try a different search.
        </p>
      </div>
    </div>
  );
};

export default SearchNotFound;
