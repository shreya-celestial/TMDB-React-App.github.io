import Filter from "./Filters";
import styles from '../../stylesModules/Menu.module.css'
import Contents from "./Contents";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";

const TopRated = () => {
    const [funcToSend, setFuncToSend] = useState('topRatedConts')
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { dataToSend: data, isPending, tempMsg } = useFetch(funcToSend, page, filters);

    const handleFilters = (allFilters) => {
        setFilters(allFilters)
        setPage(1)
        setFuncToSend('filterConts')
    }

    window.onscroll = () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5) {
            setPage(prev => prev + 1)
        }
    }

    return (
        <>
            <h2 className={styles.heading}>Top Rated Movies</h2>
            <Filter handleFilters={handleFilters} />
            {data?.length ? <div className={styles.contentsDiv}>
                {data.map((item, index) => (
                    <Contents key={index} data={item} />
                ))}
            </div> : ''}
            {isPending && <div className={styles.contentsDiv}>
                <h2>{tempMsg}</h2>
            </div>}
        </>
    );
}

export default TopRated;