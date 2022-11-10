import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import open from "../imagesIcon/open.png"
import back from "../imagesIcon/back.jpg"

function NavBar() {
    const [openNav, setOpenNav] = useState(false)
    const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  )
  useEffect(() => {
    window
    .matchMedia("(min-width: 768px)")
    .addEventListener('change', e => setMatches( e.matches ));
  }, []);
    return (
        <>
            {!matches &&
                < >
            <button className={styles.burgerMenu} onClick={()=>setOpenNav(!openNav)} >
            {openNav ? <img src={back} alt=''/> : <img src={open} alt=''/>}
            </button>
            {openNav && <nav className={styles.navbar}><ul>
                <li>
                    <Link to="/singleNewsItem">
                        <h2>singleNewsItem</h2>
                    </Link>
                </li>
                <li>
                    <Link to="/singleTechItem">
                        <h2>singleTechItem</h2>
                    </Link>
                </li>
                <li>
                    <Link to="/ItemPageImages">
                        <h2>ItemPageImages</h2>
                    </Link>
                </li>
            </ul>
                </nav>}
            </>
                }
            {matches &&
                <nav className={styles.navbar}>
            <ul>
                <li>
                    <Link to="/singleNewsItem">
                        <h2>singleNewsItem</h2>
                    </Link>
                </li>
                <li>
                    <Link to="/singleTechItem">
                        <h2>singleTechItem</h2>
                    </Link>
                </li>
                <li>
                    <Link to="/ItemPageImages">
                        <h2>ItemPageImages</h2>
                    </Link>
                </li>
            </ul>
            </nav>}
        </>
    );
}

export default NavBar;
