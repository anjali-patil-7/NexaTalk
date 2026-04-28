import jwt from "jsonwebtoken";

// Shared cookie options — MUST be identical on set AND clear for cross-origin
export const COOKIE_OPTIONS = {
	httpOnly: true,   // prevent XSS
	sameSite: "None", // required for cross-origin (Vercel ↔ Render)
	secure: true,     // required when sameSite is "None"
};

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		...COOKIE_OPTIONS,
		maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
	});
};

export default generateTokenAndSetCookie;