import { useState } from 'react';
import styles from '../../stylesModules/Welcome.module.css'
import { createSearchParams, useNavigate } from 'react-router-dom';

const Welcome = () => {
	const nav = useNavigate();
	const [searchValue, setSearchValue] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();
		nav({
			pathname: 'search',
			search: createSearchParams({
				query: searchValue
			}).toString()
		})
	}

	return (
		<div className={styles.welcomeBg} >
			<div className={styles.welcomeScreen}>
				<h1>Welcome.</h1>
				<h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
				<form onSubmit={handleSearch}>
					<input type="text" placeholder="Search for a movie......" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
					<button>Search</button>
				</form>
			</div>
		</div>
	);
}

export default Welcome;