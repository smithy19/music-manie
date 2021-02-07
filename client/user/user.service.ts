import axios from 'axios';
import { User } from './user';

class UserService {
	private URI: string;
	constructor() {
		// URL of the express server
		this.URI = 'http://localhost:3000/users/';
		// this.URI = 'http://35.166.133.163:3000/users/';
	}
	getLogin(): Promise<User> {
		// withCredentials sends our cookies with the request.
		return axios
			.get(this.URI, { withCredentials: true })
			.then((result: any) => {
				console.log(result);
				return result.data;
			});
	}

	login(user: User): Promise<User> {
		return axios
			.post(this.URI, user, { withCredentials: true })
			.then((result: any) => result.data)
			.catch((err: any) => err);
	}
	logout(): Promise<null> {
		return axios
			.delete(this.URI, { withCredentials: true })
			.then((result: any) => null);
	}

	deleteByUsername(username: string): Promise<null> {
		return axios
			.delete(this.URI + '/' + username, { withCredentials: true })
			.then((result: any) => null)
			.catch((err: any) => err);
	}

	//Look here to add user
	addUser(user: User): Promise<null> {
		return axios
			.post(this.URI + 'register', user, { withCredentials: true })
			.then((result: any) => result.data)
			.catch((err) => err);
	}

	updateUser(user: User): Promise<void> {
		return axios
			.put(this.URI, user, { withCredentials: true })
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}
}

export default new UserService();
