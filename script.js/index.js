const apiUrl = "https://elinjakobsen.no/wp-json/"

async function getProducts {
	const response = await fetch(apiUrl);
	
	if (response.ok) {
		return await response.json()
	}

	throw new Error("Failed to get products!")
}