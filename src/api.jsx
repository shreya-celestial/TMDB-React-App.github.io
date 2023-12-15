const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzgyNzM0OGI4ZWY5OGI3NGUyOTg4ODk0NGJhZTZlYyIsInN1YiI6IjY1NDMzZmVmZTFhZDc5MDBlYTU3OWM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-87S7MvmbnW2pQX9XdN87KazRKzPDGRa_aZwO8BttGI';

export const getTrendingPopularContents = async (url) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    try {
        const response = await fetch(url, options);
        const trendingData = await response.json();
        return trendingData;
    }
    catch {
        return null
    }
};

export const getClickedItem = async (id, genre) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/${genre}/${id}?language=en-US`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const searchItem = async (searchThis, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/search/movie?query=${searchThis}&language=en-US&page=${page}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getAllGenres = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/genre/movie/list?language=en`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getPopularMovies = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getTopRatedMovies = async (page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getFilteredData = async (filterParams, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=${filterParams.dd}&vote_average.gte=${filterParams.score[0]}&vote_average.lte=${filterParams.score[1]}&vote_count.gte=${filterParams.votes}&with_genres=${filterParams.genres}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getRequestToken = async () => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/authentication/token/new`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const createSessionWithLogin = async (body) => {
    let options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify(body)
    };
    let url = `https://api.themoviedb.org/3/authentication/token/validate_with_login`;
    try {
        let response = await fetch(url, options).catch(err => console.error(err));
        let data = await response.json();
        body = {
            request_token: data.request_token
        };
        options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${AUTH_TOKEN}`
            },
            body: JSON.stringify(body)
        };
        url = `https://api.themoviedb.org/3/authentication/session/new`;
        response = await fetch(url, options);
        data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getAccountId = async (session_id) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/account?api_key=a7827348b8ef98b74e29888944bae6ec&session_id=${session_id}`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const getWatchlist = async (id, page, genre) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        }
    };
    const url = `https://api.themoviedb.org/3/account/${id}/watchlist/${genre}?language=en-US&page=${page}&sort_by=created_at.asc`;
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }
    catch {
        return null
    }
};

export const addToWatchlist = async (body, accountId) => {
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${AUTH_TOKEN}`
        },
        body: JSON.stringify(body)
    };
    const url = `https://api.themoviedb.org/3/account/${accountId}/watchlist`;
    try {
        const response = await fetch(url, options);
        return response.json();
    }
    catch {
        return null
    }
};