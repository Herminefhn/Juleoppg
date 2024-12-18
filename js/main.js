// Countdown Timer (no changes needed)
function updateCountdown() {
    const targetDate = new Date("December 20, 2024 13:00:00").getTime();
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = formatTime(days);
    document.getElementById("hours").innerText = formatTime(hours);
    document.getElementById("minutes").innerText = formatTime(minutes);
    document.getElementById("seconds").innerText = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Snow Animation (no changes needed)
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

function createSnowflakes() {
    snowflakes.length = 0;
    for (let i = 0; i < 169; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1.5 + 0.5,
            wind: Math.random() * 0.5 - 0.25
        });
    }
}

function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    snowflakes.forEach(snowflake => {
        ctx.beginPath();
        ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
        ctx.fill();

        snowflake.y += snowflake.speed;
        snowflake.x += snowflake.wind;

        if (snowflake.y > canvas.height) {
            snowflake.y = 0;
            snowflake.x = Math.random() * canvas.width;
        }
    });
}

function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
}

createSnowflakes();
animateSnow();

// Gift Suggestions (no changes needed)
const giftIdeas = [
    "En personlig kaffekopp",
    "En koselig ullgenser",
    "Et spennende boksett",
    "En DIY gavekurv",
    "En opplevelsesgave (som ein konsert eller teaterbilletter)",
    "En luksuriøs hudpleiepakke",
    "Et kult spill til familien",
    "En abonnementstjeneste for streaming",
    "En plante for hjemmet",
    "En fancy vannflaske eller termos",
    "En kul ryggsekk",
    "En god vin eller en spennende ølpakke",
    "Et personlig smykke",
    "Et fotobok-album",
    "En avslappende massasjeapparat"
];

const generateGiftButton = document.getElementById('generateGiftButton');
const giftSuggestion = document.getElementById('giftSuggestion');

function generateGift() {
    const randomIndex = Math.floor(Math.random() * giftIdeas.length);
    giftSuggestion.textContent = giftIdeas[randomIndex];
    giftSuggestion.style.display = 'block';
}

generateGiftButton.addEventListener('click', generateGift);

// Dropdown Menu (no changes needed)
document.getElementById('toggleButton').addEventListener('click', () => {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Show sections based on button clicks
function showSection(sectionId) {
    const gavetypeSection = document.getElementById('gavetype');
    const julekalenderSection = document.getElementById('julekalender');

    // Reset display for both sections
    gavetypeSection.style.display = 'none';
    julekalenderSection.style.display = 'none';

    // Show the correct section based on the sectionId
    if (sectionId === 'gavetype') {
        gavetypeSection.style.display = 'block';
    } else if (sectionId === 'julekalender') {
        julekalenderSection.style.display = 'grid'; // Set to grid for Julekalender
        generateCalendar(); // Ensure calendar is generated when shown
    }

    // Close the dropdown after selection
    document.getElementById('dropdownMenu').style.display = 'none';
}

// Add event listeners for the dropdown menu items
document.getElementById('gavetypeButton').addEventListener('click', () => showSection('gavetype'));
document.getElementById('julekalenderButton').addEventListener('click', () => showSection('julekalender'));

// Initialize the page with the Gavetips section visible
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('gavetype').style.display = 'block'; // Default to show Gavetips
    document.getElementById('julekalender').style.display = 'none'; // Hide Julekalender initially
});


// Generate the Julekalender days with functionality for "opened" and "locked" states

function generateCalendar() {
    const julekalenderSection = document.getElementById("julekalender");
    julekalenderSection.innerHTML = ''; // Clear any existing calendar

    const currentDate = new Date();
    const currentDay = currentDate.getDate(); // Get the current day of the month (1-31)

    for (let i = 1; i <= 24; i++) {
        const day = document.createElement("div");
        day.classList.add("day");
        day.textContent = i;

        // Assign emojis manually
        const emojis = [
            "🎄", "🎁", "☃️", "❄️", "🌟", "🍬", "🕯️", "🧸", "🍪", "🥂",
            "🎶", "🎅", "🦌", "🎉", "🌈", "📖", "🛷", "🍷", "🍫", "🧦",
            "💫", "🌍", "✨", "🎂"
        ];
        const emojiForDay = emojis[i - 1]; // Get the emoji for this day

        // Lock days beyond the current day
        if (i > currentDay) {
            day.classList.add("locked");
        } else {
            day.classList.add("unlocked");
        }

        // Add click event for each day
        day.addEventListener('click', () => {
            if (day.classList.contains('locked')) {
                showPopup("Du kan ikke åpne denne luken enda!"); // Locked day message
                return;
            }
            if (!day.classList.contains('opened')) {
                day.classList.add('opened');
                day.textContent = `${i} ${emojiForDay}`; // Update day with emoji
                showPopup(`🎉 Gratulerer! Du har åpnet luke ${i}! ${emojiForDay}`); // Show message with emoji
            }
        });

        julekalenderSection.appendChild(day);
    }
}

// Function to show the custom pop-up
function showPopup(message) {
    const existingPopup = document.querySelector('.popup');
    if (existingPopup) {
        existingPopup.remove(); // Remove any existing popup to prevent overlap
    }

    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    // Style the popup (adjust as needed)
    popup.style.position = 'fixed';
    popup.style.top = '30%'; 
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.color = 'white';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.2)';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';
    popup.style.fontSize = '1.2em';

    document.body.appendChild(popup);

    // Remove the popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000); // 3000ms = 3 seconds
}

// Call the generateCalendar function
generateCalendar();
