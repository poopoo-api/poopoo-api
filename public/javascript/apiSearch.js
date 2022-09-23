const articles = Array.from(document.getElementsByClassName("card"));
const input = document.getElementById("search");

const articlesArray = [];

articles.map((element) => {
	articlesArray.push({
		desc: element.dataset.desc,
		element: element
	})
})

input.addEventListener("input", (e) => {
	console.log(e.target.value)
  const value = e.target.value ? e.target.value.toLowerCase() : ""
  articlesArray.map((element) => {
	  if(element.desc) {
		  const matched = element.desc.toLowerCase().includes(value)
			console.log(matched)
	  
    		element.element.classList.toggle("hide", !matched);
	  }
  });
});