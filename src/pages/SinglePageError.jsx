import { useRouteError } from "react-router-dom"

const SinglePageError = () =>{
    const error = useRouteError();
    // console.log(error.message);
    return <h2>{error.message}</h2>
}
// error.message gives the error when fetched by axios
export default SinglePageError;