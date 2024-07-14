module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				reggae: ['"Reggae One"', "cursive"],
			},
			boxShadow: {
				"top-lg":
					"0 -30px 50px -10px rgba(0, 0, 0, 0.2), 0 -15px 30px -5px rgba(0, 0, 0, 0.2)", // Ombre vers le haut
				"bottom-lg":
					"0 30px 50px -10px rgba(0, 0, 0, 0.2), 0 15px 30px -5px rgba(0, 0, 0, 0.2)", // Ombre plus longue vers le bas
			},
		},
	},
	plugins: [],
};
