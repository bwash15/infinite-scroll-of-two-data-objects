import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

// Data Objects
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async ( url ) => {
  const response = await fetch( url );
  return response.json();
};

export function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isError, error, isLoading, isFetching } = useInfiniteQuery(
    "sw-people",
    ( { pageParam = initialUrl } ) => fetchUrl( pageParam ),
    {
      getNextPageParam: ( lastPage ) => lastPage.next || undefined,
    }
  );

  if ( isLoading ) return <div className="loading">Loading person Data...</div>;
  if ( isError ) return <div>Error Loading Person Data: `${ error.toString() }`</div>;


  // TODO: get data for InfiniteScroll via React Query
  return (
    <>
      { isFetching && <div className="loading">Loading...</div> }
      <InfiniteScroll loadMore={ fetchNextPage } hasMore={ hasNextPage } >
        { data.pages.map( pageData => {
          return pageData.results.map( person => {
            return <Person key={ person.name }
              name={ person.name }
              hairColor={ person.hairColor }
              eyeColor={ person.eyeColor }
            />
          } )
        } ) }
      </InfiniteScroll>
    </>
  );
}
