const NEZHA_ORIGIN = "https://status.humanzoo.us";

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/api/")) {
			const target = new URL(url.pathname + url.search, NEZHA_ORIGIN);
			const headers = new Headers(request.headers);
			headers.set("Origin", NEZHA_ORIGIN);

			return fetch(
				new Request(target, {
					body: request.body,
					headers,
					method: request.method,
					redirect: "manual",
				}),
			);
		}

		return env.ASSETS.fetch(request);
	},
};
