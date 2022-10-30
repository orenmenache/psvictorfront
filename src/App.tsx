import { Routes, Route } from 'react-router-dom';
import PagePsVictorNewsItem from './pages/Page__PsVictorNewsItem';
//import PagePsVictorTechItem from './pages/Page__PsVictorTechItem';

import NavBar from './pages/NavBar';
import { GenericProvider } from './providers/GenericProvider';
import HomePage from './pages/Home';
import ItemPageImages from './components/ItemPageImages/ItemPageImages';
import ItemPageImagesDetails from './components/ItemPageImagesDetails/ItemPageImagesDetails';

function App() {
    return (
        <>
            <GenericProvider>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/singleNewsItem"
                        element={<PagePsVictorNewsItem />}
                    />

                    {/* <Route
                        path="/singleTechItem"
                        element={<PagePsVictorTechItem />}
                    /> */}
                    <Route path='/ItemPageImages' element={<ItemPageImages />} />
                    <Route path='/ItemPageImages/:id' element={ <ItemPageImagesDetails/>} />
                </Routes>
            </GenericProvider>
        </>
    );
}

export default App;
