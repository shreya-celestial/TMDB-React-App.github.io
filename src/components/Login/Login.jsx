import { useEffect, useState } from 'react'
import styles from '../../stylesModules/Login.module.css'
import { useNavigate } from 'react-router-dom'
import { getRequestToken, createSessionWithLogin, getAccountId } from '../../api'
import { useContext } from 'react';
import { UserContext } from '../../store/userContext'

const Login = () => {
    const nav = useNavigate()
    const [requestToken, setRequestToken] = useState(null)
    const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        if (user)
            nav('/user')
    }, [user])

    const getToken = async () => {
        const response = await getRequestToken();
        if (response?.request_token) {
            setRequestToken(response.request_token);
        }
        else {
            // suman feedback 
            // use material ui alert component to dislay message
            // https://mui.com/material-ui/react-alert/
            // that should be apply for all the project
            alert('Something went wrong... Please try again!')
            location.reload();
            // suman feedback 
            // please explain me why location.reload is needed
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
    // suman feedback
    // can you please make the below form with material UI components
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