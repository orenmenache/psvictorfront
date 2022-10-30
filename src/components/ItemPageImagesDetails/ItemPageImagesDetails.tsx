import { Link,useParams,useLocation } from "react-router-dom"

export default function ItemPageImagesDetails() {
    
  const { id } = useParams();
  const location = useLocation();
  const backLinkHref = location.state?.from;
  return (
      <div>
          <Link to={backLinkHref}>
            Go back
          </Link>
          <h2>ItemPageImagesDetails {id}</h2>
      </div>
  )
}
