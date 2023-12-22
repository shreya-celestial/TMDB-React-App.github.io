import { useEffect, useRef, useState } from "react";
import { getPopularMovies, getTopRatedMovies, getFilteredData } from '../api'

const useFetch = (funcToCall, page, filters) => {
	const [dataToSend, setDataToSend] = useState([]);
	const [tempMsg, setTempMsg] = useState('Loading...');
	const [isPending, setIsPending] = useState(true);
	const [isEnd, setIsEnd] = useState(1);

	const ref = useRef(0);

	const getInitialMsgs = () => {
		setIsPending(true);
		setTempMsg('Loading...')
		if (page === 1) {
			setDataToSend([]);
		}
	}

	const getData = (data) => {
		if (page === 1 && data?.total_pages >= 0) {
			setIsEnd(data.total_pages)
		}
		if (page === 1 && data?.results?.length === 0) {
			setIsPending(true);
			setTempMsg('Nothing to show!')
			ref.current = 0
			return
		}
		if (page > 1 && data?.results?.length === 0 && dataToSend.length > 0) {
			setIsPending(true);
			setTempMsg('Nothing more to show!')
			ref.current = 0
			return
		}
		if (data?.results?.length) {
			setIsPending(false);
			setDataToSend((prev) => [...prev, ...data.results]);
			if (data?.total_pages === 1) {
				ref.current = 0;
				return;
			}
			ref.current = 1;
			return
		}
		setIsPending(true);
		setTempMsg('Failed to load.. Please try again!')
		ref.current = 0
	}

	const getPopularConts = async () => {
		if (isEnd >= page) {
			getInitialMsgs();
			const data = await getPopularMovies(page);
			getData(data);
		}
	}

	const getTopRatedConts = async () => {
		if (isEnd >= page) {
			getInitialMsgs();
			const data = await getTopRatedMovies(page);
			getData(data);
		}
	}

	const getFilteredConts = async () => {
		if (ref.current) {
			getInitialMsgs();
			const data = await getFilteredData(filters, page);
			getData(data);
		}
	}

	useEffect(() => {
		ref.current = 1
		window.scrollTo(0, 0)
	}, [filters])

	useEffect(() => {

		if (funcToCall === 'popularConts') {
			getPopularConts();
		}

		if (funcToCall === 'topRatedConts') {
			getTopRatedConts();
		}

		if (funcToCall === 'filterConts') {
			getFilteredConts();
		}

	}, [funcToCall, page, filters])

	return { dataToSend, isPending, tempMsg };
}

export default useFetch;