const joinProcess = (joinList: any, modelNames: string[] = []) => {
	if (modelNames.length == 0) {
		let keys = Object.keys(joinList);
		keys.map((item) => {
			joinList[item]();
		});
		return;
	}
	modelNames.map((modelName) => {
		if (typeof joinList[modelName] == 'undefined') {
			return;
		}
		joinList[modelName]();
	});
};

export default joinProcess;
