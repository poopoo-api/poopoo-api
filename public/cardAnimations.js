const cards = document.querySelectorAll(".card")
const constrain = 15;
function transforms(x, y, el) {
    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height / 2)) / constrain;
    let calcY = (x - box.x - (box.width / 2)) / constrain;

    return "perspective(200px) rotateX(" + calcX + "deg) rotateY(" + calcY + "deg) scale(1.2)";
};

function transformElement(el, xyEl) {
    el.style.transform = transforms.apply(null, xyEl);
}
cards.forEach(card => {
    let mouseOverContainer = card;
    let ex1Layer = card;

    mouseOverContainer.onmousemove = function (e) {
        let xy = [e.clientX, e.clientY];
        let position = xy.concat([ex1Layer]);

        window.requestAnimationFrame(function () {
            transformElement(ex1Layer, position);
        });
    };
    mouseOverContainer.onmouseleave = () => {
        ex1Layer.style.transform = null
    }
})
// https://armandocanals.com/posts/CSS-transform-rotating-a-3D-object-perspective-based-on-mouse-position.html