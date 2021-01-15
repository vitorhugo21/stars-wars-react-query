import { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);
  return res.json();
}

const People = () => {
  const [page, setPage] = useState(1);
  const {
    isLoading,
    isError,
    data,
    isPreviousData
  } = useQuery(
    ['planets', page],
    () => fetchPeople(page),
    { keepPreviousData: true}
  );

  return (
      <div>
        <h2>People</h2>
        {isLoading && (<div>Loading data...</div>)}
        {isError && (<div>Error fetching data</div>)}
        {(!isLoading && !isError) && (
          <>
            <button
              onClick={() => setPage(old => Math.max(old - 1, 1))}
              disabled={page === 1}>
              Previous page
            </button>
            <span>{page}</span>
            <button
              onClick={() => {
                if (!isPreviousData && data.next) {
                  setPage(old => old + 1)
                }
              }}
              disabled={isPreviousData || !data.next}>
              Next page
            </button>
            <div>
              {data.results.map(person =>
                <Person key={person.name} person={person} />)}
            </div>
          </>
        )}
      </div>
  );
}

export default People;
