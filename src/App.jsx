import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import NotFound from './components/NotFound';
import DetailPage from './components/DetailPage';
import SearchPage from './components/SearchPage';
import Popular from './components/MoviesMenu/Popular';
import TopRated from './components/MoviesMenu/TopRated';
import Login from './components/Login/Login';
import { UserContext } from './store/userContext';
import User from './components/Login/User';
import RootLayout from './RootLayout';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const App = () => {
    const [sessionUser, setSessionUser] = useState(sessionStorage.getItem('user'))

    const user = {
        user: JSON.parse(sessionUser),
        setUser: setSessionUser
    }

    const router = createBrowserRouter([
        {
            path: '/', element: <RootLayout />, errorElement: <NotFound />, children: [
                { index: true, element: <Home /> },
                { path: ':genre/:id', element: <DetailPage /> },
                { path: 'search', element: <SearchPage /> },
                { path: 'popular', element: <Popular /> },
                { path: 'topRated', element: <TopRated /> },
                { path: 'login', element: <Login /> },
                { path: 'user', element: <User /> }
            ]
        }
    ])

    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <UserContext.Provider value={user}>
                <RouterProvider router={router} />
                {/* <BrowserRouter>
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
            </BrowserRouter> */}
            </UserContext.Provider>
        </QueryClientProvider>
    );
}

export default App;