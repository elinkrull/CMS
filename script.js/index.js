//Error handling

function showError(message) {
	const errorContainer = document.getElementById("best-sellers-jackets");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }
  
  //Loading indicator
  
  function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("best-sellers-jackets");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
  }

const apiUrl = "http://elinjakobsen.no/wp-json/wc/store/products/"

async function getJackets() {
	try {
	  const response = await fetch(apiUrl);
	  const result = await response.json();
	  return result;
  
	} catch (error) {
	  throw new Error("Sorry, something went wrong.");
	}
  }


async function displayJackets() {
	try {
	  const jackets = await getJackets();
  
	  const jacketsFrontPageContainer = document.getElementById("best-sellers-jackets");
	  jacketsFrontPageContainer.innerHTML = "";
  
	  for (let i = 0; i < 4; i++) {
		const jacket = jackets[i];
  
		jacketsFrontPageContainer.innerHTML += `<div class="best-sellers-jackets-container">
										  <a href="specificproduct.html?id=${jacket.id}&title=${jacket.name}"><img src="${jacket.images[0].src}" alt="${jacket.description} "class="images-js"></a>
										  <h2>${jacket.name}</h2>
										  <p>USD ${jacket.prices}</p>
										  </div>`;
	  }
	} catch (error) {
	  showError(error.message);
	}
  }
  
  displayJackets();

  // Display the jackets on the index.html page:

async function displayJackets() {
	try {
	  const jackets = await getJackets();
  
	  const jacketsFrontPageContainer = document.getElementById("best-sellers-jackets");
	  jacketsFrontPageContainer.innerHTML = "";
  
	  for (let i = 0; i < 4; i++) {
		const jacket = jackets[i];
  
		jacketsFrontPageContainer.innerHTML += `<div class="best-sellers-jackets-container">
										  <a href="specificproduct.html?id=${jacket.id}&title=${jacket.name}"><img src="${jacket.images[0].src}" alt="${jacket.description} "class="images-js"></a>
										  <h2>${jacket.name}</h2>
										  <p>USD ${jacket.prices}</p>
										  </div>`;
	  }
	} catch (error) {
	  showError(error.message);
	}
  }
  
  displayJackets();