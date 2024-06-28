import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";
import { useQuery } from "@tanstack/react-query";

const cocktailSearchUrl =
'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchCocktailsQuery = (searchTerm) =>{
  return{
    queryKey : ['search',searchTerm || 'all'],
    queryFn: async()=>{
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
      return response.data.drinks;
    }
  }
}

// it is must to return something from loader, might be null too, but if we don't return anything then error triggers
export const loader = (queryClient)=>async({request})=>{
  const url = new URL(request.url);
  const searchTerm=url.searchParams.get('search') || '';
  // const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`);
  // return {drinks:response.data.drinks,searchTerm};
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm));
  // seedha kahin bhi hooks invoke nhi kar skte, so loader mein ek queryClient pass karna hoga, so that we can take care of the functionality in the loader


  return {searchTerm};
}

const Landing = () => {
  // const {drinks,searchTerm}=useLoaderData();
  // console.log(drinks);

  const {searchTerm} = useLoaderData();
  const {data:drinks} = useQuery(searchCocktailsQuery(searchTerm));

  return (
    <>
      <SearchForm searchTerm ={searchTerm}/>
      <CocktailList drinks={drinks}/>
    </>
  )
}
export default Landing;

// in the recent version of react router we can use a loader which pre fetches the data, even before we request and right away show use the data on render