import { App } from "../app";

const app = new App();
app.dbConfig();

app.listen(() => {
	console.log("Server running in port " + app.port);
});
