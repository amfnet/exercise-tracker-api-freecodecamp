import { UserInterface } from "../users/interfaces";

export interface ExerciseInterface {
	_id: string;
	user: UserInterface | string | any;
	description: string;
	duration: number;
	date?: Date;
}
