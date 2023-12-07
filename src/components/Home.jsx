import Welcome from "./Home/Welcome"
import ScrollerComps from "./Home/ScrollerComps";

const Home = () => {
    return (
        <>
            <Welcome />
            <ScrollerComps compFor={'Trending'} />
            <ScrollerComps compFor={'Popular'} />
        </>
    );
}

export default Home;