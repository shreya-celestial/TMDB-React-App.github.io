import styles from '../../stylesModules/Contents.module.css'
import moment from 'moment';
// import { useNavigate } from 'react-router-dom'

const Contents = ({ data }) => {
    // const nav = useNavigate();

    const imgSrc = `https://image.tmdb.org/t/p/original${data.poster_path}`

    const handleClick = () => {
        window.open(`/movie/${data.id}`)
        // nav(`/movie/${data.id}`)
    }

    return (
        <div className={styles.contentDiv} onClick={handleClick}>
            <img src={imgSrc} alt="" />
            <h3>{data.title || data.name}</h3>
            <h4>{moment(data.release_date).format("MMM DD, YYYY")}</h4>
        </div>
    );
}

export default Contents;