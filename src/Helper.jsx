export function getAttributeFromObejcts(objects, attr) {
	let results = [];
	objects.forEach(function(d) {
		results.push(d[attr]);
	});
	return results;
}