import express, { Express } from "express";
import { router } from "./routes/index.routes";
import cors from "cors";
import { urlencoded } from "body-parser";
import { connectDB } from "./services/mongodb";

class App {
	private server: Express;
	port: number;

	constructor(pPort: number = 3000) {
		this.server = express();
		this.port = pPort;
		this.server.use(cors());
		this.middlewares();
		this.server.use(router);
	}

	dbConfig() {
		connectDB();
	}

	middlewares() {
		this.server.use(urlencoded({ extended: false }));
	}

	listen(callback: () => void): void {
		this.server.listen(this.port, callback);
	}
}

export { App };
