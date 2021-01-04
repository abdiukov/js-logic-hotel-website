/**
 * @param {array} images contains array of image locations 
 */
var images = [
    "images/sorrento/apartment_front.jpg",
    "images/sorrento/apartment_garden.jpg",
    "images/sorrento/back_beach_sorrento.jpg",
    "images/sorrento/ocean_beach_2.jpg"
];

/**
 * @param {array} image_description - Description of each image
 */
var image_description = ["Apartment frontyard", "Apartment backyard", "Mesmerizing beach", "Beautiful landscape of Sorrento"];

var slideIndex = 1;
showSlides(slideIndex);

/**
 * Load Script is used when the script is loaded. It assigns the image to each value
 */
function LoadScript() {
    var slides = document.getElementsByClassName("slideshow");
    var slides_image = document.getElementsByClassName("slideshow_image");
    for (i = 0; i < slides.length; i++) {
        slides_image[i].src = images[i];
    }
}




/**
 * 
 * Next/previous controls
 * @param {int} n - current image index
 */
function plusSlides(n) {
    showSlides(slideIndex += n);
}

/**
 * Gets the current slide
 * @param {int} n - current image index 
 */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/**
 * Code that shows the slide, the caption, the thumbnail
 * Also that code allows the buttons and thumbnail images to work - e.g when you click them, the image changes
 * @param {int} n - current image index
 */
function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slideshow");
    var dots = document.getElementsByClassName("thumbnail_image");
    var captionText = document.getElementById("caption");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    captionText.innerHTML = image_description[slideIndex - 1];
}