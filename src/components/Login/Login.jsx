import { useEffect, useState } from 'react'
import styles from '../../stylesModules/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getRequestToken, createSessionWithLogin, getAccountId } from '../../api'
import { useContext } from 'react';
import { UserContext } from '../../store/userContext'

const Login = () => {
    const nav = useNavigate()
    const [requestToken, setRequestToken] = useState(null)
    const { setUser } = useContext(UserContext);

    const getToken = async () => {
        const response = await getRequestToken();
        if (response?.request_token) {
            setRequestToken(response.request_token);
        }
        else {
            alert('Something went wrong... Please try again!')
            location.reload();
        }
    }

    useEffect(() => {
        getToken();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            request_token: requestToken
        };
        const data = await createSessionWithLogin(body);
        if (data?.success) {
            const accountDetails = await getAccountId(data.session_id);
            if (accountDetails?.id) {
                sessionStorage.setItem('user', JSON.stringify(accountDetails));
                setUser(JSON.stringify(accountDetails))
                nav('/user')
                return
            }
        }
        alert('Authentication Failed! Re-enter your id and password.');
        location.reload()
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Login to your account</h2>
            <label>Username</label>
            <input type="text" name='username' />
            <label>Password</label>
            <input type="password" name='password' />
            <button>Login</button>
        </form>
    );
}

export default Login;