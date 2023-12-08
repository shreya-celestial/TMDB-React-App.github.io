import logo from '../assets/logo.svg'
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, createSearchParams, useNavigate, useLocation } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from '../stylesModules/NavBar.module.css'

const NavBar = () => {
    const nav = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    const [searchValue, setSearchValue] = useState('');
    const [searchIcon, setSearchIcon] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (location.pathname === '/search') {
            setSearchIcon(true);
            if (query)
                setSearchValue(query)
            else
                setSearchValue('')
        }
        if (location.pathname === '/*') {
            setSearchIcon(false);
            setSearchValue('')
        }
        if (location.pathname === '/') {
            setSearchValue('')
        }
    }, [location])

    const handleSearch = (e) => {
        e.preventDefault();
        nav({
            pathname: 'search',
            search: createSearchParams({
                query: searchValue
            }).toString()
        })
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav className={styles.fixedNav}>
                <div className={styles.nav}>
                    <div>
                        <img src={logo} alt="logo" onClick={() => nav('/')} />
                        <Button onClick={handleClick} sx={{ color: 'white', marginLeft: '20px', textTransform: 'none', fontSize: 'medium' }}>Movies</Button>
                        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <Link to='/popular'><MenuItem onClick={handleClose}>Popular</MenuItem></Link>
                            <Link to='/topRated'><MenuItem onClick={handleClose}>Top Rated</MenuItem></Link>
                        </Menu>
                    </div>
                    <div>
                        <Link to='/login'>Login</Link>
                        <IconButton onClick={() => setSearchIcon(prev => !prev)}>
                            <SearchOutlinedIcon sx={{ color: 'white', ml: '20px' }} />
                        </IconButton>
                    </div>
                </div>
                {searchIcon && <form onSubmit={handleSearch}>
                    <input type="text" className={styles.search} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder='Search for a movie......' />
                </form>}
            </nav>
        </>
    );
}

export default NavBar;