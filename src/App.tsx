//import SendNewsItemToPS from './pages/Page__PsVictorNewsItems';
import { NewsContext } from './contexts/NewsContext';
import PagePsVictorNewsItem from './pages/Page__PsVictorNewsItem';
//import PagePsVictorTechItem from './pages/Page__PsVictorTechItems';
import { Routes, Route } from 'react-router-dom';
import NavBar from './pages/NavBar';
import NewsProvider from './providers/NewsProvider';

function App() {
    return (
        <>
            <NavBar />
            <NewsProvider>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <h1>You're not supposed to be here</h1>
                            </>
                        }
                    />

                    <Route
                        path="/singleNewsItem"
                        element={<PagePsVictorNewsItem />}
                    />
                </Routes>
            </NewsProvider>
        </>
    );
}

export default App;
