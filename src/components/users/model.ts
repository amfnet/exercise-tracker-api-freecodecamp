import { Schema } from "mongoose";
import { UserInterface } from "./interfaces";
import { mongoose } from "../../services/mongodb";

const UsersSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
});

class UserModel {
	public usersModel;

	constructor() {
		this.usersModel = mongoose.model("Users", UsersSchema);
	}

	async saveUser(username: string): Promise<UserInterface> {
		try {
			/*let doc = await this.usersModel.findOneAndDelete(
				{ username },
				{ new: true }
			);*/
			const doc = await this.usersModel.create({ username });
			//console.log(doc);
			return { _id: doc._id.toString(), username: doc.username };
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getUsers(): Promise<UserInterface[]> {
		try {
			const doc: UserInterface[] = await this.usersModel.find();
			return doc;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}

	async getUser(id: string | UserInterface): Promise<UserInterface | null> {
		try {
			let useId;

			if (typeof id == "string") {
				useId = id;
			} else {
				useId = id._id;
			}

			const doc: UserInterface | null = await this.usersModel.findById(
				useId
			);
			return doc;
		} catch (error) {
			//console.log(error);
			throw "User not exist";
		}
	}
}

export class UserModelCreator {
	private static model: UserModel | null = null;

	private constructor() {}

	public static instance(): UserModel {
		if (UserModelCreator.model == null)
			UserModelCreator.model = new UserModel();
		return UserModelCreator.model;
	}
}
