import { useState, useEffect, useContext } from 'react';
import styles from '../../stylesModules/User.module.css'
import { IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { getWatchlist, addToWatchlist } from '../../api'
import { useNavigate } from 'react-router-dom'
import moment from 'moment';
import { UserContext } from '../../store/userContext'
import ErrorAlert from '../ErrorAlert'

const User = () => {
    const { user } = useContext(UserContext)
    const [targetKey, setTargetKey] = useState('movies')
    const [tempMsg, setTempMsg] = useState('Loading...')
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1);
    const [isEnd, setIsEnd] = useState(1);
    const nav = useNavigate();
    const [isAlert, setIsAlert] = useState(false);
    const [timeOut, setTimeOut] = useState(6);
    const [alertMsg, setAlertMsg] = useState('');

    useEffect(() => {
        if (!user)
            nav('/login')
    }, [user])

    const getWatchListData = async () => {
        const response = await getWatchlist(user.id, page, targetKey)
        if (response?.results) {
            if (page === 1) {
                setData([])
                setIsEnd(response.total_pages)
            }
            if (response?.results.length > 0) {
                setTempMsg(null);
                setData(prev => [...prev, ...response.results])
            } else {
                setData(null)
                setTempMsg('Nothing to show!')
            }
            return
        }
        setTempMsg('Failed to get your watchlist... Please try again!')
    }

    useEffect(() => {
        if (page === 1) {
            setTempMsg('Loading... ')
        }
        getWatchListData();
    }, [targetKey, page]);

    window.onscroll = () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            if (page < isEnd)
                setPage(prev => prev + 1)
        }
    }

    const handleButtonClick = (element) => {
        window.scrollTo(0, 0)
        setIsEnd(1)
        setTargetKey(element)
        setTempMsg(null)
        setData(null)
        setPage(1)
    }

    const handleTileClick = (id) => {
        if (targetKey === 'movies')
            nav(`/movie/${id}`);
        else
            nav(`/tv/${id}`)
    }

    const handleDelete = async (id) => {
        const body = {
            media_type: (targetKey === 'movies' ? 'movie' : 'tv'),
            media_id: id,
            watchlist: false
        }
        const temp = data;
        setTempMsg('Loading...')
        setData(null);
        const response = await addToWatchlist(body, user.id)
        if (response?.success) {
            setPage(1)
            setIsEnd(1)
            getWatchListData();
        }
        else {
            setData(temp)
            setAlertMsg('Unable to delete.. Please try again!')
            setIsAlert(true)
        }
    }

    useEffect(() => {
        let timeInt
        if (isAlert) {
            timeInt = setTimeout(() => {
                setIsAlert(false)
            }, timeOut * 1000)
        }
        return () => {
            clearTimeout(timeInt)
        }
    }, [isAlert])

    return (
        <>
            {isAlert && <ErrorAlert message={alertMsg} needButtons={false} timeOut={timeOut} />}
            <div>
                <div className={styles.bg}>
                    <div className={styles.bgUser}>
                        <span className={styles.userLogo}>{(user.username.substring(0, 1)).toUpperCase()}</span>
                        <h1>{user.username}</h1>
                    </div>
                </div>
                <div className={styles.user}>
                    <div className={styles.userWatchListHeadings}>
                        <h1>WatchList</h1>
                        <div className={styles.buttons}>
                            <button onClick={() => handleButtonClick('movies')} className={targetKey === 'movies' ? styles.selected : ''}><h4>Movies</h4></button>
                            <button onClick={() => handleButtonClick('tv')} className={targetKey === 'tv' ? styles.selected : ''}><h4>TV Shows</h4></button>
                        </div>
                        <div className={styles.userWatchList}>
                            {data && data.map((item) => {
                                const imgSrc = `https://image.tmdb.org/t/p/original${item.poster_path}`;
                                return (
                                    <div key={item.id} onClick={() => handleTileClick(item.id)}>
                                        <img src={imgSrc} />
                                        <div className={styles.contents}>
                                            <h3>{item.title || item.name}</h3>
                                            <h4>{moment(item.release_date || item.first_air_date).format("MMM DD, YYYY")}</h4>
                                            <p>{item.overview}</p>
                                        </div>
                                        <div className={styles.deleteDiv}>
                                            <IconButton onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(item.id)
                                            }}>
                                                <DeleteForeverIcon sx={{ fontSize: 'xx-large', color: 'rgba(3,37,65,1)' }} />
                                            </IconButton>
                                        </div>
                                    </div>
                                )
                            })}
                            {!data && (<h5>{tempMsg}</h5>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;