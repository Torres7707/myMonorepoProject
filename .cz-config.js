// 设置提交模板
module.exports = {
	types: [
		{ value: "✨feat", name: "✨feat:          增加新功能" },
		{ value: "🐛fix", name: "🐛fix:           修复bug" },
		{ value: "💎ui", name: "💎style:         样式修改不影响逻辑" },
		{ value: "📝docs", name: "📝docs:          修改文档" },
		{ value: "🏰chore", name: "🏰chore:          对脚手架做了些更改" },
		{
			value: "refactor",
			name: "🌠refactor: 代码重构（不包括 bug 修复、功能新增）",
		},
		{ value: "🔂revert", name: "🔂revert:        版本回退" },
	],

	scopes: [
		{ name: "pages" },
		{ name: "components" },
		{ name: "utils" },
		{ name: "hooks" },
		{ name: "chore" },
	],
	messages: {
		type: "请选择提交的类型；",
		scope: "请选择修改的范围（可选）",
		subject: "请简要描述提交（必填）",
		body: "请输入详细描述（可选）",
		// footer: '填写子任务id或bug id（必选）',
		confirmCommit: "确认要使用以上信息提交？（y/n）",
	},
	skip: ["body"],
	subjectLimit: 72,
	footerPrefix: "JIRA ID:",
};
