import { Link, useLocation } from "react-router-dom"


export default function ItemPageImages() {
    const location = useLocation();
  return (
    <ul>
          <li key={1}>
              <Link to={`/ItemPageImages/:1`} state={{ from: location }}>
                  <img src="https://via.placeholder.com/250x250"alt="pageImg1"/>
              </Link>
          </li>
          <li key={2}>
              <Link to={`/ItemPageImages/:2`} state={{ from: location }}>
                  <img src="https://via.placeholder.com/250x250"alt="pageImg2"/>
              </Link>
          </li>
          <li key={3}>
              <Link to={`/ItemPageImages/:3`} state={{ from: location }}>
                  <img src="https://via.placeholder.com/250x250"alt="pageImg3"/>
              </Link>
          </li>
          <li key={4}>
              <Link to={`/ItemPageImages/:4`} state={{ from: location }}>
                  <img src="https://via.placeholder.com/250x250"alt="pageImg4"/>
              </Link>
          </li>
    </ul>
  )
}
