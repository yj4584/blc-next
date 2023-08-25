export function getTaskId() {
	return (
		'task(' +
		Math.random().toString(36).slice(2, 7) +
		Math.random().toString(36).slice(2, 7) +
		Math.random().toString(36).slice(2, 7) +
		')'
	);
}

export function sleep(t: number) {
	return new Promise((resolve) => setTimeout(resolve, t));
}
export function base64toFile(baseData: string, filename: string) {
	let arr: any = baseData.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}

	return new File([u8arr], filename, { type: mime });
}
