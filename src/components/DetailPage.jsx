import { useParams } from "react-router-dom";
import { getClickedItem } from '../api'
import { useEffect, useState } from "react";
import { IconButton } from '@mui/material';
import styles from '../stylesModules/DetailPage.module.css'
import moment from "moment";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const DetailPage = () => {
    const { genre, id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const data = await getClickedItem(id, genre)
            setData(data);
            console.log(data);
        }
        getData();
    }, [])

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
                            <span><b>{data.title || data.name}</b> ({moment(data.release_date || data.first_air_date).format("YYYY")})</span>
                            <p className={styles.minorDetailsP}>{moment(data.release_date || data.first_air_date).format("DD/MM/YYYY")}&bull;{'genres here'}&bull;{'runtime here'}</p>
                            <IconButton sx={{ width: 'fit-content', margin: '10px 0 0', fontSize: 'large' }}>
                                <AddCircleOutlineIcon sx={{ color: 'white', justifySelf: 'flex-start' }} />
                            </IconButton>
                            {/* <div className={styles.wishlistMsg} style={{ left: '447px', top: '286px', display: 'none' }}>Login to add this movie to your watchlist</div> */}
                            <p><i>{data.tagline}</i></p>
                            <h4>Overview</h4>
                            <p className={styles.movieOverview}>{data.overview}</p>
                        </div>
                    </div>

                </div>
            )}
        </>
    );
}

export default DetailPage;