// import useFetch from "../../hooks/useFetch";
import Filter from "./Filters";
import styles from '../../stylesModules/Menu.module.css'
import Contents from "./Contents";
import { useEffect, useState } from "react";
import { useQuery } from '@tanstack/react-query'
import { getMovies } from './getMovies'

const Popular = () => {
	// const { dataToSend: data, isPending, tempMsg } = useFetch(funcToSend, page, filters);
	const [funcToSend, setFuncToSend] = useState('popularConts')
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({});
	const [dataToMap, setDataToMap] = useState([]);
	const [isEnd, setIsEnd] = useState(1);

	const { data, isPending, isError, error: tempMsg } = useQuery({
		queryKey: ['movies', { funcToSend, page, filters }],
		queryFn: ({ signal, queryKey }) => getMovies({ signal, ...queryKey[1] })
	})

	useEffect(() => {
		if (!isError && data) {
			setIsEnd(data?.total_pages)
			setDataToMap(prev => [...prev, ...data?.results])
		}
	}, [data])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const handleFilters = (allFilters) => {
		setDataToMap([])
		window.scrollTo(0, 0)
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
			if (page <= isEnd)
				setPage(prev => prev + 1)
		}
	}

	return (
		<>
			<h2 className={styles.heading}>Popular Movies</h2>
			<Filter handleFilters={handleFilters} />
			{data?.total_results !== 0 ? '' : (
				<div className={styles.contentsDiv}>
					<h2>Nothing to show!</h2>
				</div>
			)}
			{dataToMap.length ? <div className={styles.contentsDiv}>
				{dataToMap.map((item, index) => (
					<Contents key={index} data={item} />
				))}
			</div> : ''}
			{isPending && <div className={styles.contentsDiv}>
				<h2>Loading...</h2>
			</div>}
			{isError && <div className={styles.contentsDiv}>
				<h2>{tempMsg}</h2>
			</div>}
		</>
	);
}

export default Popular;