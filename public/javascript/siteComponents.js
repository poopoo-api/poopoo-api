// Navbar
  var navbar = ` 
    <nav>
      <ul class="navigation-bar">
        <li><a href="/">About</a></li>
        <li><a href="/api">Current APIs</a></li>
        <li><a href="#faq">FAQ</a></li>
        <li class="discord"><a href="https://discord.gg/MfEXDm5mr6"><svg height="32" width="118" class="filter-svg-nav" >
        <image xlink:href="images/discord.svg" src="images/discord.png" height="32"/>    
  </svg></a></li>
      </ul>
    </nav>`;

  document.body.insertAdjacentHTML("afterbegin", navbar);

// Footer
var footer = ` 
    <footer>
      <div>
        <h2>PooPoo API</h2>
        <p id="developers_footer_spawn_point" class="footer-credits">
        <p style="color: #d4d4d4; padding-top: 1.2em;"><b>Featured:</b> <a href="https://www.npmjs.com/package/@retro_ig/poopoo-api-package" target="_blank">PooPoo API npm package</a></p>
      </div>
    </footer>`;

  document.body.insertAdjacentHTML("afterend", footer);