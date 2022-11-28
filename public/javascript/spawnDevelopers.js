const spawnpoint = document.getElementById("developers_spawn_point")
const footer_spawnpoint = document.getElementById("developers_footer_spawn_point")

fetch('https://getpantry.cloud/apiv1/pantry/04190bfb-0547-43e3-879f-a50647c395b3/basket/poopoo-api-devs').then(response => {
  let devUsers = []
    response.json().then(json => {
      // Auto update credits in the homepage
        json.devs.forEach(dev => {
            const div = document.createElement("div")
            div.classList.add("dev")
            const pfp = document.createElement("img")
            pfp.src = dev.pfp
            pfp.alt = dev.name
            devUsers.push(dev.name.slice(0, dev.name.length - 5))
            div.append(pfp)
            const h3 = document.createElement("h3")
            h3.innerHTML = String(dev.name).replace(/</gmi, "&lt;")
            div.append(h3)
            let roles = []
            dev.role.forEach(role => {
              // Add developer roles
              if(role == 1019985488049881108){roles.push("Lead Developer")}
              if(role == 1019985588792868965){roles.push("Website Designer")}
              if(role == 1019985605058383893){roles.push("API Developer")}
            })
            const p = document.createElement("p")
          p.innerHTML = String(roles.join(", ")).replace(/</gmi, "&lt;")
          div.append(p)
					try {
            spawnpoint.append(div)
					} catch(err){}
        })
  // Auto update the footer
  const p = document.createElement("p")
  p.innerHTML = String(`Developed by PooPoo Devs (${devUsers.join(", ")}) ${(new Date()).getFullYear()}`).replace(/</gmi, "&lt;")
			try {
  footer_spawnpoint.append(p)
			} catch(err){}
    })
})