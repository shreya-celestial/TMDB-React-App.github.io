import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../stylesModules/ScollerComps.module.css'
import { getTrendingPopularContents } from '../../api';
import moment from 'moment';
// suman feedback, 
// set your indenting with 2 spaces only
const trendingButtons = [{
    name: 'Today',
    key: 'day',
    url: 'https://api.themoviedb.org/3/trending/all/day?language=en-US'
},
{
    name: 'This Week',
    key: 'week',
    url: 'https://api.themoviedb.org/3/trending/all/week?language=en-US'
}]

const popularButtons = [
    {
        name: 'Movie',
        key: 'movie',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
    },
    {
        name: 'On TV',
        key: 'tv',
        url: 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
    },
    {
        name: 'People',
        key: 'people',
        url: 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1'
    },
]

const ScrollerComps = ({ compFor }) => {
    const [customButtons, setCustomButtons] = useState([]);
    const [data, setData] = useState(null);
    const [tempMessage, setTempMessage] = useState('Loading...');
    const [targetKey, setTargetKey] = useState(null);

    const nav = useNavigate();

    useEffect(() => {
        if (compFor === 'Trending') {
            setCustomButtons(trendingButtons);
            setTargetKey(trendingButtons[0].key);
            getData(trendingButtons[0].url);
        }
        else {
            setCustomButtons(popularButtons);
            getData(popularButtons[0].url)
            setTargetKey(popularButtons[0].key)
        }
    }, [compFor])


    const getData = async (url) => {
        const data = await getTrendingPopularContents(url);
        if (data)
            setData(data.results);
        else
            setTempMessage('Error.. Try Again!')
    }

    const handleClick = (key, url) => {
        if (targetKey !== key) {
            setTempMessage('Loading...')
            setData(null);
            setTargetKey(key)
            getData(url);
        }
    }

    const handleTile = (id, index) => {
        if (compFor === 'Trending') {
            nav(`/${data[index].media_type}/${id}`)
        } else {
            if (targetKey === 'people') {
                nav(`/person/${id}`)
                return // suman feedback, this return needed
            }
            nav(`/${targetKey}/${id}`)
        }

        // suman feedback
        // this whole above block could be like this
        // as much the code is flat(not nested) it's easy to read 

        // if (compFor === 'Trending') {
        //     nav(`/${data[index].media_type}/${id}`)
        // } else if(targetKey === 'people') {
        //     nav(`/person/${id}`)
        //     return
        // } else {
        //     nav(`/${targetKey}/${id}`)
        // }
    }

    return (
        <div className={styles.module}>
            <div className={styles.headings}>
                <h2>Trending</h2>
                <div className={styles.buttons}>
                    {customButtons.map((currentButton) => (
                        <button key={currentButton.key} onClick={() => handleClick(currentButton.key, currentButton.url)} className={targetKey === currentButton.key ? styles.selected : ''}><h4>{currentButton.name}</h4></button>
                    ))}
                </div>
            </div>
            <div className={styles.contents}>
                {(!data || (data && !data.length)) && <div className={styles.loading}>
                    <h1>{tempMessage}</h1>
                </div>}
                {data && <>
                    <div className={styles.extraDiv}></div>
                    {data.map((dataItem, index) => {
                        const imgSrc = `https://image.tmdb.org/t/p/original${dataItem.poster_path || dataItem.profile_path}`
                        return (<div key={dataItem.id} className={styles.contentDivs} onClick={() => handleTile(dataItem.id, index)}>
                            <img src={imgSrc} />
                            <h3>{dataItem.title || dataItem.name}</h3>
                            <h4>{moment(dataItem.release_date).format("MMM DD, YYYY")}</h4>
                        </div>
                        )
                    })}
                    <div className={styles.extraDiv}></div>
                </>}
            </div>
        </div>
    );
}

export default ScrollerComps;