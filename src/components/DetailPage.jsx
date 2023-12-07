import { useParams, useNavigate } from "react-router-dom";
import { getClickedItem } from '../api'
import { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import styles from '../stylesModules/DetailPage.module.css'
import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DetailPage = () => {
    const { genre, id } = useParams();
    const [data, setData] = useState(null);
    const [disp, setDis] = useState('none');
    const nav = useNavigate();

    const getRunTime = (time) => {
        let runtime = `${Math.trunc(time / (60))}hrs`;
        if (time % 60 !== 0) {
            runtime += ` ${time % 60}mins`;
        }
        return runtime
    }

    const getGenres = (genres) => {
        let str = ''
        for (let i = 0; i < genres.length - 1; i++) {
            str += genres[i].name + ", ";
        }
        str += genres[genres.length - 1].name;
        return str;
    }

    useEffect(() => {
        const getData = async () => {
            const data = await getClickedItem(id, genre)
            if (data && !data?.status_code) {
                setData(data);
                if (data?.runtime) {
                    data["runtime"] = await getRunTime(data?.runtime);
                }
                else {
                    data["runtime"] = 'Unknown Runtime';
                }
                if (data?.genres) {
                    data["genres"] = await getGenres(data?.genres)
                }
                return;
            }
            nav('../*')
        }
        getData();
    }, [])

    const handleHover = () => {
        if (!sessionStorage.getItem('user')) {
            setDis('block')
        }
    }

    const handleStopHover = () => {
        if (!sessionStorage.getItem('user')) {
            setDis('none')
        }
    }

    return (
        <>
            {!data && <div className="notfound">
                <h1>Loading...</h1>
            </div>}
            {data && (
                <div className={styles.bg} style={{
                    backgroundImage: data.backdrop_path ? `url('https://image.tmdb.org/t/p/original${data.backdrop_path}')` : ''
                }}>
                    <div className={styles.bgOverlay}>
                        <img src={`https://image.tmdb.org/t/p/original${data.poster_path || data.profile_path}`} />
                        <div className={styles.movieContents}>
                            <span><b>{data.title || data.name}</b> {data.release_date || data.first_air_date ? `(${moment(data.release_date || data.first_air_date).format("YYYY")})` : ''}</span>
                            <p className={styles.minorDetailsP}>{moment(data.release_date || data.first_air_date || data.birthday).format("DD/MM/YYYY")} &bull; {data.place_of_birth || data.genres} {(data.runtime !== 'Unknown Runtime' && !data.biography) && `• ${data.runtime}`}</p>
                            {!data.biography && (
                                <IconButton onMouseOver={handleHover} onMouseOut={handleStopHover} sx={{ width: 'fit-content', margin: '10px 0 0' }}>
                                    <AddCircleOutlineIcon sx={{ color: 'white', justifySelf: 'flex-start', fontSize: 40 }} />
                                </IconButton>
                            )}
                            <div className={styles.wishlistMsg} style={{ left: '480px', top: '286px', display: disp }}>Login to add this movie to your watchlist</div>
                            <p><i>{data.tagline}</i></p>
                            {!data.biography && <h4>Overview</h4>}
                            {data.biography && <h4>Biography</h4>}
                            <p className={styles.movieOverview}>{data.overview || data.biography}</p>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default DetailPage;