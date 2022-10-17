import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <Link to="/singleNewsItem">
                <h1>singleNewsItem</h1>
            </Link>
            <Link to="/singleTechItem">
                <h1>singleTechItem</h1>
            </Link>
        </nav>
    );
}

export default NavBar;
