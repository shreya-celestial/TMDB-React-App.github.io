import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import DetailPage from './components/DetailPage';

const App = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="pages">
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/:genre/:id' element={<DetailPage />} />
                    <Route exact path='*' element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;