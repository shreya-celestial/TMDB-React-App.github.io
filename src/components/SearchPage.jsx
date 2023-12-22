import { useEffect, useState } from "react";
import { searchItem } from '../api';
import noImg from '../assets/noImg.jpg'
import moment from "moment";
import { Pagination, Stack } from '@mui/material';
import { useLocation, useNavigate } from "react-router-dom";
import styles from '../stylesModules/SearchPage.module.css'
import { useQuery } from '@tanstack/react-query'

const SearchPage = () => {
	const location = useLocation();
	const nav = useNavigate();
	const queryParams = new URLSearchParams(location.search);
	const query = queryParams.get('query');
	const [tempMsg, setTempMsg] = useState(null);
	const [page, setPage] = useState(1);
	const [data, setData] = useState([])

	const { data: allData, isPending } = useQuery({
		queryKey: ['search', { query, page }],
		queryFn: ({ signal, queryKey }) => getData({ signal, ...queryKey[1] })
	})

	useEffect(() => {
		setData(allData?.results.slice(0, 6))
	}, [allData])

	useEffect(() => {
		setPage(1)
	}, [query])

	window.onscroll = () => {
		const {
			scrollTop,
			scrollHeight,
			clientHeight
		} = document.documentElement;

		if (scrollTop + clientHeight >= scrollHeight - 5) {
			if (data && data?.length === 6 && allData?.results.length > 6) {
				const newData = allData?.results.slice(7, 13)
				setData(prev => [...prev, ...newData])
			}
			else if (data && data?.length === 12 && allData?.results.length > 12) {
				const newData = allData.results.slice(14, allData.results.length)
				setData(prev => [...prev, ...newData])
			}
		}
	}

	const getData = async ({ page, query }) => {
		setTempMsg('Loading...')
		if (query) {
			const searchVal = query.replaceAll(' ', '%20')
			const data = await searchItem(searchVal, page);
			if (!data) {
				setTempMsg('Error.. Please try again!');
				return null
			}
			if (data.results.length) {
				setTempMsg(null);
				return data
			}
			else {
				setTempMsg("No Matches Found!");
				return null
			}
		}
		else {
			setTempMsg('It looks like that you are looking for something. Please try searching that..')
			return null
		}
	}

	const handleChange = (e, value) => {
		if (value !== page) {
			setPage(value);
			window.scrollTo(0, 0)
		}
	}

	const handleClick = (id) => {
		nav(`/movie/${id}`)
	}

	return (
		<>
			{(isPending || !data) && <h1 className={styles.tempMsg}>{tempMsg}</h1>}
			{(data && data.length > 0) && <div className={styles.searchDiv} >
				<div className={styles.searchData}>
					{data.map((movie) => {
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
				{allData?.total_pages > 1 ? <Stack spacing={2}>
					<Pagination count={allData?.total_pages} page={page} onChange={handleChange} />
				</Stack> : ''}
			</div >}
		</>
	);
}

export default SearchPage;