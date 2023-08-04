/*Shows or hides the side menu.*/

//Deletes the preload class after the page is loaded.
window.addEventListener("load", () => {
    document.body.classList.remove("preload");
});


document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".nav");

    //Adds the "nav--open" class by pressing the menu button.
    document.querySelector("#btn_Nav").addEventListener("click", () => {
        nav.classList.add("nav--open");
    });

    //Removes the "nav--open" class by pressing on the overlay or menu button.
    document.querySelector(".nav__overlay").addEventListener("click", () => {
        nav.classList.remove("nav--open");
    });
});
