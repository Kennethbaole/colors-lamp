const {
	isValidColorName,
	formatColorName,
	isValidLogin,
	buildColorListHtml
} = require("../public/js/validators");

describe("isValidColorName", () => {
	test("accepts simple lowercase color names", () => {
		expect(isValidColorName("red")).toBe(true);
		expect(isValidColorName("blue")).toBe(true);
	});

	test("accepts multi-word and hyphenated names", () => {
		expect(isValidColorName("Royal Blue")).toBe(true);
		expect(isValidColorName("blue-green")).toBe(true);
	});

	test("rejects empty or whitespace-only input", () => {
		expect(isValidColorName("")).toBe(false);
		expect(isValidColorName("   ")).toBe(false);
	});

	test("rejects non-string input", () => {
		expect(isValidColorName(null)).toBe(false);
		expect(isValidColorName(undefined)).toBe(false);
		expect(isValidColorName(123)).toBe(false);
	});

	test("rejects names containing digits or symbols", () => {
		expect(isValidColorName("red123")).toBe(false);
		expect(isValidColorName("blue!")).toBe(false);
		expect(isValidColorName("#FF0000")).toBe(false);
	});

	test("rejects names longer than 50 characters", () => {
		expect(isValidColorName("a".repeat(51))).toBe(false);
		expect(isValidColorName("a".repeat(50))).toBe(true);
	});
});

describe("formatColorName", () => {
	test("trims surrounding whitespace and lowercases", () => {
		expect(formatColorName("  Red  ")).toBe("red");
		expect(formatColorName("Royal Blue")).toBe("royal blue");
	});

	test("collapses multiple internal spaces", () => {
		expect(formatColorName("Royal    Blue")).toBe("royal blue");
	});

	test("returns empty string for non-string input", () => {
		expect(formatColorName(null)).toBe("");
		expect(formatColorName(undefined)).toBe("");
		expect(formatColorName(42)).toBe("");
	});
});

describe("isValidLogin", () => {
	test("accepts non-empty username and password", () => {
		expect(isValidLogin("user", "pass")).toBe(true);
	});

	test("rejects empty or whitespace-only username", () => {
		expect(isValidLogin("", "pass")).toBe(false);
		expect(isValidLogin("   ", "pass")).toBe(false);
	});

	test("rejects empty password", () => {
		expect(isValidLogin("user", "")).toBe(false);
	});

	test("rejects non-string input", () => {
		expect(isValidLogin(null, "pass")).toBe(false);
		expect(isValidLogin("user", null)).toBe(false);
	});
});

describe("buildColorListHtml", () => {
	test("joins results with line breaks", () => {
		expect(buildColorListHtml(["red", "blue", "green"])).toBe(
			"red<br />\r\nblue<br />\r\ngreen"
		);
	});

	test("returns single item without separator", () => {
		expect(buildColorListHtml(["red"])).toBe("red");
	});

	test("returns empty string for empty array", () => {
		expect(buildColorListHtml([])).toBe("");
	});

	test("returns empty string for non-array input", () => {
		expect(buildColorListHtml(null)).toBe("");
		expect(buildColorListHtml(undefined)).toBe("");
	});
});
