const spawnpoint = document.getElementById("developers_spawn_point")
fetch('https://getpantry.cloud/apiv1/pantry/04190bfb-0547-43e3-879f-a50647c395b3/basket/poopoo-api-devs').then(response => {
    response.json().then(json => {
        json.devs.forEach(dev => {
            const div = document.createElement("div")
            div.classList.add("dev")
            const pfp = document.createElement("img")
            pfp.src = dev.pfp
            pfp.alt = dev.name
            div.append(pfp)
            const h3 = document.createElement("h3")
            h3.innerHTML = String(dev.name).replace(/</gmi, "&lt;")
            div.append(h3)
            spawnpoint.append(div)
        })
    })
})