const articles = Array.from(document.getElementsByClassName("card"));
const input = document.getElementById("search");

const articlesArray = [];

articles.map((element) => {
	articlesArray.push({
		title: element.dataset.tittle,
		element: element
	})
})

input.addEventListener("input", (e) => {
	console.log(e.target.value)
  const value = e.target.value ? e.target.value.toLowerCase() : ""
  articlesArray.map((element) => {
	  if(element.title) {
		  const matched = element.title.toLowerCase().includes(value)
			console.log(matched)
	  
    		element.element.classList.toggle("hide", !matched);
	  }
  });
});