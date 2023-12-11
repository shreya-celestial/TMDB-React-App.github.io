import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import DetailPage from './components/DetailPage';
import SearchPage from './components/SearchPage';
import Popular from './components/MoviesMenu/Popular';
import TopRated from './components/MoviesMenu/TopRated';
import Login from './components/Login/Login';
import { UserContext } from './store/userContext';
import User from './components/Login/User';

const App = () => {
    const [sessionUser, setSessionUser] = useState(sessionStorage.getItem('user'))

    const user = {
        user: JSON.parse(sessionUser),
        setUser: setSessionUser
    }

    return (
        <UserContext.Provider value={user}>
            <BrowserRouter>
                <NavBar />
                <div className="pages">
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path='/:genre/:id' element={<DetailPage />} />
                        <Route exact path='/search' element={<SearchPage />} />
                        <Route exact path='/popular' element={<Popular />} />
                        <Route exact path='/topRated' element={<TopRated />} />
                        {!user.user && (
                            <Route exact path='/login' element={<Login />} />
                        )}
                        {user.user && <Route exact path='/user' element={<User />} />}
                        <Route exact path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

export default App;