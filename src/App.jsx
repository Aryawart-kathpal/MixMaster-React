import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import {About,HomeLayout,Error,Landing,NewsLetter,Cocktail,SinglePageError} from './pages';
import {loader as landingLoader} from "./pages/Landing";
import {loader as singleCocktailLoader} from './pages/Cocktail';
import {action as newsLetterAction} from './pages/NewsLetter';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// console.log(newsLetterAction);

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000*60*5, //caching for 5 minutes
    }
  }
});

const router= createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element: <Landing/>,
        loader:landingLoader(queryClient),
        errorElement:<SinglePageError/>
      },
      {
        path: 'cocktail/:id',
        errorElement:<SinglePageError/>,
        loader:singleCocktailLoader(queryClient),
        element: <Cocktail/>,
      },
      {
        path: 'newsletter',
        element: <NewsLetter/>,
        action:newsLetterAction,
        errorElement:<SinglePageError/>
      },
      {
        path:'about',
        element:<About/>
      }
    ]
  },
  
])

const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  ) 
};
export default App;
