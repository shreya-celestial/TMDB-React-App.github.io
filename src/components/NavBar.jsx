import logo from '../assets/logo.svg'
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import styles from '../stylesModules/NavBar.module.css'

const NavBar = () => {
    const nav = useNavigate();
    const [searchIcon, setSearchIcon] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleSearch = (e) => {
        e.preventDefault();
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
                            <MenuItem onClick={handleClose}><Link to='/popular'>Popular</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to='/topRated'>Top Rated</Link></MenuItem>
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
                    <input type="text" className={styles.search} placeholder='Search for a movie......' />
                </form>}
            </nav>
        </>
    );
}

export default NavBar;