import { Alert, Stack, AlertTitle, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const STYLES = {
    float: 'right',
    width: '30%',
    position: 'absolute',
    right: '3vw',
    top: '12vh'
}

const BUTTONS = {
    margin: '0 5px',
}

const ErrorAlert = ({ message, needButtons, timeOut }) => {
    const nav = useNavigate()
    const [timer, setTimer] = useState(timeOut);

    const handleReload = () => {
        location.reload()
    }

    const handleCancel = () => {
        nav('/')
    }

    useEffect(() => {
        let timerInt;
        if (!needButtons) {
            timerInt = setInterval(() => {
                if (timer > 0)
                    setTimer(prev => prev - 1)
            }, 1000)
        }
        return () => {
            clearInterval(timerInt)
        }
    }, [needButtons])

    return (
        <Stack sx={STYLES} spacing={2}>
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {message}
                {needButtons && <div style={{ width: '100%', textAlign: 'center', margin: '15px 0' }}>
                    <Button sx={BUTTONS} color='error' variant='outlined' onClick={handleReload}>Reload</Button>
                    <Button sx={BUTTONS} color='error' variant='outlined' onClick={handleCancel}>Cancel</Button>
                </div>}
                {!needButtons && <p style={{ margin: '10px 0 10px 0', marginLeft: '70px' }}>Closing in {timer} seconds..</p>}
            </Alert>
        </Stack>
    );
}

export default ErrorAlert;