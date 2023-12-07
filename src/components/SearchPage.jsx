import { useEffect, useState } from "react";
import { searchItem } from '../api';
import noImg from '../assets/noImg.jpg'
import moment from "moment";
import { Pagination, Stack } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../stylesModules/SearchPage.module.css'

const SearchPage = () => {
    const location = useLocation();
    const nav = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [tempMsg, setTempMsg] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);

    const getData = async (page) => {
        const searchVal = query.replaceAll(' ', '%20')
        const data = await searchItem(searchVal, page);
        if (data.results.length) {
            setTempMsg(null);
            setData(data);
        }
        else
            setTempMsg("No Matches Found!");
        console.log(data);
    }

    const handleChange = (e, value) => {
        console.log('changed to ' + value)
        setPage(value);
        setTempMsg('Loading...')
        setData(null);
        getData(value);
    }

    const handleClick = (id) => {
        nav(`/movie/${id}`)
    }

    useEffect(() => {

        if (query.includes('/')) {
            nav('../*')
        }
        setTempMsg('Loading...')
        setData(null);
        getData(1)
        setPage(1);

    }, [query])

    return (
        <>
            {tempMsg && <h1 className={styles.tempMsg}>{tempMsg}</h1>}
            {data && <div className={styles.searchDiv} >
                <div className={styles.searchData}>
                    {data.results.map((movie) => {
                        let imgSrc = noImg;
                        if (movie.poster_path) {
                            imgSrc = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
                        }
                        return (
                            <div key={movie.id} onClick={() => handleClick(movie.id)}>
                                <img src={imgSrc} />
                                <div className={styles.contents}>
                                    <h3>{movie.title}</h3>
                                    <h4>{moment(movie.release_date).format("MMM DD, YYYY")}</h4>
                                    <p>{movie.overview}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {data.total_pages > 1 ? <Stack spacing={2}>
                    <Pagination count={data.total_pages} page={page} onChange={handleChange} />
                </Stack> : ''}
            </div >}
        </>
    );
}

export default SearchPage;