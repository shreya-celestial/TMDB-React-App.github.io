import styles from '../../stylesModules/Filters.module.css'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import { getAllGenres } from '../../api'
import RangeSlider from './RangeSlider';

const genresObj = {
	allGenres: null,
	tempGenreMsg: '',
	selectedGenres: []
}

const filtersObj = {
	dd: 'popularity.desc',
	score: [0, 10],
	votes: 500,
	genres: ''
}

const Filter = ({ handleFilters }) => {
	const [sortDisplay, setSortDisplay] = useState(false);
	const [filtersDisplay, setFiltersDisplay] = useState(true);
	const [genre, setGenre] = useState(genresObj)
	const [filters, setFilters] = useState(filtersObj)

	const getGenres = async () => {
		const genres = await getAllGenres();
		if (genres?.genres?.length) {
			setGenre((prev) => ({
				...prev,
				['tempGenreMsg']: '',
				['allGenres']: genres.genres
			}))
			return
		}
		setGenre((prev) => ({
			...prev,
			['tempGenreMsg']: 'Failed to get genres.. Please try again!',
			['allGenres']: null
		}))
	}

	useEffect(() => {
		setGenre((prev) => ({
			...prev,
			['tempGenreMsg']: 'Loading genres..',
		}))
		getGenres();
	}, [])

	const handleDDChange = (e) => {
		setFilters((prev) => ({
			...prev,
			['dd']: e.target.value
		}))
	}

	const handleScoreRange = (e, value) => {
		setFilters((prev) => ({
			...prev,
			['score']: value
		}))
	}

	const handleVoteRange = (e, value) => {
		setFilters((prev) => ({
			...prev,
			['votes']: value
		}))
	}

	const handleGenreClick = (e, id) => {
		if (e.target.className.includes(styles.selected)) {
			e.target.className = '';
			const genres = genre.selectedGenres.filter((genre) => genre != id)
			setGenre((prev) => ({
				...prev,
				['selectedGenres']: genres
			}))
		}
		else {
			setGenre((prev) => ({
				...prev,
				['selectedGenres']: [...prev.selectedGenres, id]
			}))
			e.target.className += ` ${styles.selected}`
		}
	}

	useEffect(() => {
		let genreStr = '';
		genre.selectedGenres.forEach((value) => {
			genreStr += (value + '%2C');
		});
		if (genreStr.length)
			genreStr = genreStr.substring(0, genreStr.length - 3);
		setFilters((prev) => ({
			...prev,
			['genres']: genreStr
		}))
	}, [genre.selectedGenres])

	const handleSubmit = async (e) => {
		e.preventDefault();
		handleFilters(filters)
	}

	return (
		<form className={styles.filtersDiv} onSubmit={handleSubmit}>
			{!sortDisplay && (
				<div className={`${styles.sortDiv} ${styles.border} ${styles.extraPadding}`} onClick={() => { setSortDisplay(true) }}>
					<h3>Sort</h3>
					<KeyboardArrowRightIcon />
				</div>
			)}
			{sortDisplay && (
				<div className={styles.border} >
					<div className={`${styles.sortDiv} ${styles.extraPadding}`} onClick={() => { setSortDisplay(false) }}>
						<h3>Sort</h3>
						<KeyboardArrowDownIcon />
					</div>
					<div className={styles.sortDDDiv}>
						<p>Sort Results By</p>
						<select onChange={handleDDChange}>
							<option value="popularity.desc">Popularity Descending</option>
							<option value="popularity.asc">Popularity Ascending</option>
						</select>
					</div>
				</div>
			)}
			{!filtersDisplay && (
				<div className={`${styles.allFiltersDiv} ${styles.border} ${styles.extraPadding}`} onClick={() => { setFiltersDisplay(true) }}>
					<h3>Filters</h3>
					<KeyboardArrowRightIcon />
				</div>
			)}
			{filtersDisplay && (
				<div className={styles.border}>
					<div className={`${styles.allFiltersDiv} ${styles.extraPadding}`} onClick={() => { setFiltersDisplay(false) }}>
						<h3>Filters</h3>
						<KeyboardArrowDownIcon />
					</div>
					<div className={styles.allFiltersChildDivs}>
						<p>Genres</p>
						{genre.allGenres && (
							<div className={styles.genresDiv}>
								{genre.allGenres.map((genreItem) => (
									<p key={genreItem.id} onClick={(e) => handleGenreClick(e, genreItem.id)}>{genreItem.name}</p>
								))}
							</div>
						)}
						{!genre.allGenres && (
							<h5>{genre.tempGenreMsg}</h5>
						)}
					</div>
					<div className={styles.allFiltersChildDivs}>
						<p>User Score</p>
						<RangeSlider min={0} max={10} value={filters.score} onChange={handleScoreRange} disableSwap={true} marks />
					</div>
					<div className={styles.allFiltersChildDivs}>
						<p>Minimum User Votes</p>
						<RangeSlider min={0} max={500} step={100} marks value={filters.votes} onChange={handleVoteRange} />
					</div>
				</div>
			)}
			<button className={styles.buttonSearch}>Search</button>
		</form >
	);
}

export default Filter;