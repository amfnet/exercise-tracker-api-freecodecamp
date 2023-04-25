import { LogsInterface } from "./interfaces";
import { LogModel } from "./model";

export function getLogsService(
	id: string,
	from: Date | null = null,
	to: Date | null = null,
	limit: number | null = 3
) {
	const logModel = new LogModel();
	return logModel
		.getUserLogs(id, limit)
		.then((data) => {
			if (data == null) {
				return null;
			}
			return formatDataLogs(data, from, to);
		})
		.catch((err) => {
			throw err;
		});
}

function formatDataLogs(data: any, from: Date | null, to: Date | null) {
	const first: any = data[0];
	const logs = data
		.map((e: any) => {
			if (from && e.date) {
				if (!(e.date.getTime() >= from.getTime())) {
					return;
				}
			}

			if (to && e.date) {
				if (!(e.date.getTime() <= to.getTime())) {
					return;
				}
			}

			return {
				description: e.description,
				duration: e.duration,
				date: e.date?.toDateString(),
			};
		})
		.filter((e: any) => e != null);

	const log = {
		_id: first.user._id,
		count: data.length,
		username: first.user.username,
		log: logs,
	};

	return log;
}
