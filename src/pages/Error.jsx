import Wrapper from "../assets/wrappers/ErrorPage";
import {Link,useRouteError} from 'react-router-dom';
import img from "../assets/not-found.svg"

// error page has to be setup full and from the scratch
const Error = () => {
  const error = useRouteError();
  // console.log(error);
  if(error.status===404){
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh!</h3>
          <p>We can't seem to find the page you are looking for</p>
          <Link to='/'>Back home</Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <div>
      <h3>something went wrong</h3>
    </div>
  )
}
export default Error