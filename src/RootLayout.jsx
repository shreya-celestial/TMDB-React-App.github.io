import NavBar from "./components/NavBar";
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    return (
        <>
            <NavBar />
            <div className="pages">
                <Outlet />
            </div>
        </>
    );
}

export default RootLayout;