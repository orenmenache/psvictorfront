import { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import PagePsVictorNewsItem from './pages/Page__PsVictorNewsItem';
import PagePsVictorTechItem from './pages/Page__PsVictorTechItem';

import NavBar from './pages/NavBar';
import GenericProvider from './providers/GenericProvider';

function App() {
    return (
        <>
            <GenericProvider>
                <NavBar />
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

                    <Route
                        path="/singleTechItem"
                        element={<PagePsVictorTechItem />}
                    />
                </Routes>
            </GenericProvider>
        </>
    );
}

export default App;
