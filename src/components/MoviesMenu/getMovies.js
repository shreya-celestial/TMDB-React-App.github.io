import { getPopularMovies, getTopRatedMovies, getFilteredData } from '../../api'

export const getMovies = async ({ page, funcToSend, filters }) => {
	if (funcToSend === 'popularConts') {
		const data = await getPopularMovies(page);
		if (data?.results) {
			return data
		} else {
			throw new Error('error')
			return null;
		}
	}
	else if (funcToSend === 'topRatedConts') {
		const data = await getTopRatedMovies(page);
		if (data?.results) {
			return data
		} else {
			throw new Error('error')
			return null;
		}
	}
	else if (funcToSend === 'filterConts') {
		const data = await getFilteredData(filters, page);
		if (data?.results) {
			return data
		} else {
			throw new Error('error')
			return null;
		}
	}
}