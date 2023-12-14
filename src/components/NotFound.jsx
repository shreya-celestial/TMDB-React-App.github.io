import NavBar from "./NavBar";

const NotFound = () => {
    return (
        <>
            <NavBar />
            <div className="pages">
                <h1 className="notfound">Sorry, but the page you are looking for is not found at the moment. Please try again!</h1>
            </div>
        </>
    );
}

export default NotFound;