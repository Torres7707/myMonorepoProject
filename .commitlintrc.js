module.exports = {
	extends: ["@commitlint/config-conventional"],
	parserPreset: {
		parserOpts: {
			headerPattern: /^(.*?)(?:\((.*)\))?:?\s(.*)$/,
			headerCorrespondence: ["type", "scope", "subject"],
			// issuePrefixes: ['TECHJOB-', 'BGBI-'],
		},
	},
	rules: {
		"type-case": [0],
		"type-empty": [2, "never"],
		"type-enum": [
			2,
			"always",
			[
				"✨feat",
				"🐛fix",
				"💎ui",
				"📝docs",
				"🏰chore",
				"🌠refactor",
				"🔂revert",
			],
		],
		"scope-empty": [2, "never"],
		"subject-empty": [2, "never"],
		// 'footer-empty': [2, 'never'],
	},
};
