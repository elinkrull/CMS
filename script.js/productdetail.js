//Error handling

// hello

function showError(message) {
	const errorContainer = document.getElementById("main-container");
	errorContainer.innerHTML += `<h2>${message}</h2>`;
  }
  
  //Loading indicator
  
  function showLoadingIndicator() {
	const loadingIndicator = document.getElementById("main-container");
	loadingIndicator.innerHTML = "<li>Loading...</li>";
  }
  
  // Function to extract the jacket ID from the query parameter
  function getJacketIdFromQuery() {
	try {
	  const urlParams = new URLSearchParams(window.location.search);
	  const id = urlParams.get("id");
	  return id;
	} catch (error) {
	  throw new Error("Sorry, we could not fetch the Id");
	}
  }
  
  // Function to extract the jacket title from the query parameter
  function getJacketTitleFromQuery() {
	try {
	  const urlParams = new URLSearchParams(window.location.search);
	  const title = urlParams.get("title");
	  return title;
	} catch (error) {
	  throw new Error("Sorry, we could not fetch the Title");
	}
  }
  
  // Function to fetch jacket details using the jacket ID and populate the details section
  async function fetchJacketDetail() {
	try {
	  showLoadingIndicator();
	  const jacketId = getJacketIdFromQuery();
  
	  const title = getJacketTitleFromQuery();
  
	  if (!jacketId) showError(message);
  
	  const response = await fetch(
		`http://elinjakobsen.no/wp-json/wc/store/products/${jacketId}`
	  );
	  const jacketDetail = await response.json();
  
	  const jacketTitleContainer = document.getElementById("title");
	  const jacketDetailContainer = document.getElementById("main-container");
	  jacketDetailContainer.innerHTML = "";
  
	  //Add jacket title to the title of the page
	  jacketTitleContainer.textContent = title;
	  jacketDetailContainer.innerHTML += `
		<div class="main-container-jacket">
		<img src=${jacketDetail.images[0].src} alt=${jacketDetail.description} class="images-js">
		</div>
		<div class="main-container-info">              
		<div>
			<h1>${jacketDetail.name}</h1> 
			<p>${jacketDetail.description}</p>
			<p>USD ${jacketDetail.prices}</p>
		</div>
		<div>
			<h2>Choose size</h2>
		</div>
		<div>
			<button class="size-button">XS</button>
			<button class="size-button">S</button>
			<button class="size-button">M</button>
			<button class="size-button">L</button>
			<button class="size-button">XL</button>
		<div>
		  <div id="customAlertBox" class="hidden">
			<p>New item added to cart</p>
		  </div>
			<button id="button-count" class="add-to-cart-button" type="button"> ADD TO CART</button>
		  </div>
		</div> 
		`;
  
		
	  const addToCartButton = jacketDetailContainer.querySelector(".add-to-cart-button");
  
	  const cartCountBox = document.getElementById("cart-count-box");
  
	  var count = 0;
	  var countDisplay = document.getElementById("count");
  
	  //function to display on the cart item how many items that are added 
	  addToCartButton.addEventListener("click", function() {
		  count++;
		  countDisplay.innerHTML = count;
	  });
  
  
	  addToCartButton.addEventListener("click", () => {
		  cartCountBox.style.display = "block";
	  });
  
	  //add alert box to confirm that item is added to cart
	  const customAlertBox = document.getElementById("customAlertBox");
	  
	  addToCartButton.addEventListener("click", () => {
		customAlertBox.style.display = "block";
  
		//  Added delay to hide the box
		setTimeout(() => {
		  customAlertBox.style.display = "none";
		}, 2000);
	  });
  
  
  
	  //function to change color on the size button when being clicked
	  const sizeButtons = jacketDetailContainer.querySelectorAll(".size-button");
  
	  sizeButtons.forEach((sizeButton) => {
		let originalColor = sizeButton.style.backgroundColor || "initial"; // Store the original color
  
		sizeButton.addEventListener("click", () => {
		  if (sizeButton.style.backgroundColor === "lightgrey") {
			sizeButton.style.backgroundColor = originalColor; // Restore original color
		  } else {
			sizeButton.style.backgroundColor = "lightgrey"; // Set to lightgrey
		  }
		});
  
  
		//function to restore size button color back to initial when atc button is clicked
		addToCartButton.addEventListener("click", () => {
		  if (sizeButton.style.backgroundColor === "lightgrey") {
			  sizeButton.style.backgroundColor = originalColor;
		  }
	  });
  
  
	  });
	} catch (error) {
	  showError(error.message);
	}
  }
  
  fetchJacketDetail();