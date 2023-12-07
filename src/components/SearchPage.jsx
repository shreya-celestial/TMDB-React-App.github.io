import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchPage = () => {
    const location = useLocation();
    const nav = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    console.log(query)

    useEffect(() => {
        if (query.includes('/')) {
            nav('../*')
        }
    }, [])

    return (
        <></>
    );
}

export default SearchPage;