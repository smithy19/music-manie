import axios from 'axios';
import { Song } from './song';

class SongService {
	private URI: any;
	constructor() {
		// URL of the express server
		this.URI =
			'https://3qt05wpja8.execute-api.us-west-2.amazonaws.com/default/songs';
	}

	async getHomeSongs(): Promise<Song[]> {
		return axios
			.get(
				'https://v3gpanxg9k.execute-api.us-west-2.amazonaws.com/default/gethomesongs'
			)
			.then((result) => result.data)
			.catch((err) => {
				console.error(err);
			});
	}

	getSongs(): Promise<Song[]> {
		console.log(this.URI);
		return axios
			.get(this.URI)
			.then((result) => {
				console.log('r', result);
				return result.data;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	addSong(s: Song): Promise<null> {
		return axios.post(this.URI, s).then((result) => null);
	}
	updateSong(s: Song): Promise<null> {
		return axios.put(this.URI, s).then((result) => null);
	}

	deleteSong(song_id: number): Promise<null> {
		console.log(song_id);
		return axios
			.delete(this.URI + '/' + song_id, { withCredentials: true })
			.then((result) => null);
	}
} // end of SongService

export default new SongService();
