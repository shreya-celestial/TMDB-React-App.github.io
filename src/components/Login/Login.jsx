import { useEffect, useState } from 'react'
import styles from '../../stylesModules/Login.module.css'
import { useNavigate, useLoaderData } from 'react-router-dom'
import { getRequestToken, createSessionWithLogin, getAccountId } from '../../api'
import { useContext } from 'react';
import { UserContext } from '../../store/userContext'
import ErrorAlert from '../ErrorAlert';
import { TextField, Button, Typography } from '@mui/material';

const Login = () => {
	const nav = useNavigate()
	const [requestToken, setRequestToken] = useState(null)
	const { user, setUser } = useContext(UserContext);
	const [isAlert, setIsAlert] = useState(false);
	const [alertButtons, setAlertButtons] = useState(null);
	const [alertMsg, setAlertMsg] = useState('');
	const [timeOut, setTimeOut] = useState(0);
	const [usernameText, setUsernameText] = useState('');
	const [passwordText, setPasswordText] = useState('');

	const loaderData = useLoaderData();

	useEffect(() => {
		if (user)
			nav('/user')
	}, [user])

	useEffect(() => {
		if (loaderData) {
			if (loaderData?.request_token) {
				setRequestToken(loaderData.request_token);
			}
			else {
				setAlertMsg('Something went wrong... Please try again!')
				setAlertButtons(true);
				setIsAlert(true);
			}
		}
	}, [loaderData]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const body = {
			username: usernameText,
			password: passwordText,
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
		setAlertMsg('Authentication Failed! Re-enter your id and password.')
		setAlertButtons(false);
		setTimeOut(10)
		setIsAlert(true);
	}

	useEffect(() => {
		let timerInt
		if (!alertButtons) {
			timerInt = setTimeout(() => {
				setIsAlert(false)
				setAlertButtons(null)
			}, timeOut * 1000)
		}
		return () => {
			clearTimeout(timerInt)
		}
	}, [alertButtons])

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<Typography variant='h4'>Login to your account</Typography >
				<TextField
					label="Username"
					variant="outlined"
					disabled={alertButtons}
					value={usernameText}
					onChange={(e) => setUsernameText(e.target.value)}
					sx={{ width: '100%', margin: '10px 0' }}
				/>
				<TextField
					label="Password"
					variant="outlined"
					disabled={alertButtons}
					value={passwordText}
					type='password'
					onChange={(e) => setPasswordText(e.target.value)}
					sx={{ width: '100%', margin: '10px 0' }}
				/>
				<Button type='submit' disabled={alertButtons} sx={{
					margin: '5px 0'
				}}>Login</Button>
			</form>
			{isAlert && <ErrorAlert message={alertMsg} needButtons={alertButtons} timeOut={timeOut} />}
		</>
	);
}

export default Login;


export const loader = async () => {
	if (!sessionStorage.getItem('user')) {
		const response = await getRequestToken();
		return response
	}
	return null
}