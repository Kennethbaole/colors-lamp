function isValidColorName(name) {
	if (typeof name !== "string") return false;
	const trimmed = name.trim();
	if (trimmed.length === 0) return false;
	if (trimmed.length > 50) return false;
	return /^[a-zA-Z\s-]+$/.test(trimmed);
}

function formatColorName(name) {
	if (typeof name !== "string") return "";
	return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function isValidLogin(username, password) {
	return (
		typeof username === "string" && username.trim().length > 0 &&
		typeof password === "string" && password.length > 0
	);
}

function buildColorListHtml(results) {
	if (!Array.isArray(results)) return "";
	return results.join("<br />\r\n");
}

if (typeof module !== "undefined" && module.exports) {
	module.exports = {
		isValidColorName,
		formatColorName,
		isValidLogin,
		buildColorListHtml
	};
}
