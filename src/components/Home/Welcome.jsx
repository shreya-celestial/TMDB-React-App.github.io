import styles from '../../stylesModules/Welcome.module.css'

const Welcome = () => {
    const handleSearch = (e) => {
        e.preventDefault();
    }
    return (
        <div className={styles.welcomeBg} >
            <div className={styles.welcomeScreen}>
                <h1>Welcome.</h1>
                <h2>Millions of movies, TV shows and people to discover. Explore now.</h2>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Search for a movie......" name="search" />
                    <button>Search</button>
                </form>
            </div>
        </div>
    );
}

export default Welcome;