import 'bootstrap';

// Create the cursor glow element dynamically
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

// Update the glow position directly on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursorGlow.style.left = `${mouseX}px`;
    cursorGlow.style.top = `${mouseY}px`;
});



document.addEventListener("DOMContentLoaded", function() {
    // Function to close the splash screen
    function closeSplash() {
        const splash = document.getElementById("splash-screen");
        splash.classList.add("hidden"); // Trigger the fade-out

        // Wait for the transition to complete before removing from DOM
        setTimeout(() => splash.remove(), 800); // Matches the CSS transition duration
    }

    // Attach the event listener to the button after the DOM is fully loaded
    const enterButton = document.querySelector("#splash-screen button");
    if (enterButton) {
        enterButton.addEventListener("click", closeSplash);
    }
});

