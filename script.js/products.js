//Error handling

function showError(message) {
	const errorContainer = document.getElementById("all-jackets");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }
  
  //Loading indicator
  
  function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("all-jackets");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
  }
  
  //  API call
  
  const urlRainyDays = "http://elinjakobsen.no/wp-json/wc/store/products";
  
  async function getJackets() {
	try {
	  showLoadingIndicator();
	  const response = await fetch(urlRainyDays);
	  const result = await response.json();
	  return result;
	} catch (error) {
	  throw new Error("Sorry, we could not fetch the jackets");
	}
  }
  
  async function displayAllJackets() {
	try {
	  const productJackets = await getJackets();
	  const jacketsProductPageContainer = document.getElementById("all-jackets");
	  jacketsProductPageContainer.innerHTML = "";
  
	  for (let i = 0; i < productJackets.length; i++) {
		const jacket = productJackets[i];
  
		jacketsProductPageContainer.innerHTML += `<div class="all-jackets-container">
											 <a href="specificproduct.html?id=${jacket.id}&title=${jacket.name}"><img src="${jacket.images[0].src}" alt="${jacket.description}" class="images-js"></a>
											<h2>${jacket.name}</h2>
											<p>USD ${jacket.prices}</p>
											</div>`;
	  }
	} catch (error) {
	  showError(error.message);
	}
  }
  
  displayAllJackets();