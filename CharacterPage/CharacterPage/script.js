function openImage(img) {
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlay-img");

    // Set the clicked image as the overlay image
    overlayImg.src = img.src;

    // Show overlay with fade-in
    overlay.style.display = "flex";

    // Force reflow to allow transition (fade)
    void overlay.offsetWidth;

    overlay.classList.add("show");
}

function closeImage() {
    const overlay = document.getElementById("overlay");

    // Remove fade-in class
    overlay.classList.remove("show");

    // Wait for transition to finish before hiding completely
    setTimeout(() => {
        overlay.style.display = "none";
    }, 500); // matches CSS transition duration
}

function toggleBox(box) {
    // toggle expanded class
    box.classList.toggle("expanded");

    // optional: scroll content into view if it expands outside viewport
    if (box.classList.contains("expanded")) {
        box.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

function togglePower(box) {
    box.classList.toggle("expanded");
}
