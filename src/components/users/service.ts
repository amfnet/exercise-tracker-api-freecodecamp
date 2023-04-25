import { UserInterface } from "./interfaces";
import { UserModelCreator } from "./model";

const model = UserModelCreator.instance();

export function saveUserService(username: string): Promise<UserInterface> {
	if (username == "" || username == null)
		return Promise.reject("Invalid Username");

	return model
		.saveUser(username)
		.then((doc) => Promise.resolve(doc))
		.catch((err) => Promise.reject(err));
}

export function getUsersService(): Promise<UserInterface[]> {
	return model
		.getUsers()
		.then((doc) => Promise.resolve(doc))
		.catch((err) => Promise.reject(err));
}
