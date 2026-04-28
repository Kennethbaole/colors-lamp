const http = require("http");

let server;
let baseUrl;

beforeAll((done) => {
	server = http.createServer((req, res) => {
		let body = "";
		req.on("data", (chunk) => { body += chunk; });
		req.on("end", () => {
			res.setHeader("Content-Type", "application/json");

			if (req.method === "POST" && req.url === "/Login.php") {
				res.end(JSON.stringify({
					id: 0,
					firstName: "",
					lastName: "",
					error: "No Records Found"
				}));
				return;
			}

			if (req.method === "POST" && req.url === "/SearchColors.php") {
				const payload = body ? JSON.parse(body) : {};
				if (payload.search === "red") {
					res.end(JSON.stringify({
						results: ["red", "dark red", "crimson"],
						error: ""
					}));
					return;
				}
				res.end(JSON.stringify({
					id: 0,
					firstName: "",
					lastName: "",
					error: "No Records Found"
				}));
				return;
			}

			if (req.method === "POST" && req.url === "/AddColor.php") {
				res.end(JSON.stringify({ error: "" }));
				return;
			}

			res.statusCode = 404;
			res.end();
		});
	});

	server.listen(0, "127.0.0.1", () => {
		const port = server.address().port;
		baseUrl = `http://127.0.0.1:${port}`;
		done();
	});
});

afterAll((done) => {
	server.close(done);
});

describe("Login API contract", () => {
	test("responds with JSON containing id, firstName, lastName, and error fields", async () => {
		const response = await fetch(`${baseUrl}/Login.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ login: "test_user", password: "test_pass" })
		});

		expect(response.ok).toBe(true);
		expect(response.headers.get("content-type")).toMatch(/application\/json/);

		const data = await response.json();
		expect(data).toHaveProperty("id");
		expect(data).toHaveProperty("firstName");
		expect(data).toHaveProperty("lastName");
		expect(data).toHaveProperty("error");
		expect(typeof data.id).toBe("number");
		expect(typeof data.firstName).toBe("string");
		expect(typeof data.lastName).toBe("string");
	});
});

describe("SearchColors API contract", () => {
	test("returns results array when matches are found", async () => {
		const response = await fetch(`${baseUrl}/SearchColors.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ search: "red", userId: 1 })
		});

		expect(response.ok).toBe(true);
		const data = await response.json();
		expect(data).toHaveProperty("results");
		expect(Array.isArray(data.results)).toBe(true);
		expect(data.results.length).toBeGreaterThan(0);
		data.results.forEach((color) => {
			expect(typeof color).toBe("string");
		});
	});

	test("returns error JSON when no matches are found", async () => {
		const response = await fetch(`${baseUrl}/SearchColors.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ search: "nonexistent_color_xyz", userId: 1 })
		});

		expect(response.ok).toBe(true);
		const data = await response.json();
		expect(data).toHaveProperty("error");
		expect(data.error.length).toBeGreaterThan(0);
	});
});

describe("AddColor API contract", () => {
	test("responds with JSON for a successful add", async () => {
		const response = await fetch(`${baseUrl}/AddColor.php`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ color: "Sapphire", userId: 1 })
		});

		expect(response.ok).toBe(true);
		expect(response.headers.get("content-type")).toMatch(/application\/json/);
		const data = await response.json();
		expect(data).toHaveProperty("error");
	});
});
