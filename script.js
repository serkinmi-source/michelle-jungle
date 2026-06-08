// Get the animal cards and the background music button from the page.
var animalCards = document.querySelectorAll(".animal-card");
var musicButton = document.getElementById("musicButton");
var backgroundMusic = new Audio("sounds/background.mp3");
var animalSounds = {};
var currentAnimalSound = null;
var isMusicPlaying = false;

backgroundMusic.loop = true;
backgroundMusic.volume = 0.25;

// New JavaScript feature: dataset allows us to read custom data-* attributes
// from HTML elements, such as data-key and data-sound, and use them in JavaScript.
function playAnimalSound(card) {
    var soundPath = card.dataset.sound;
    var animalSound = animalSounds[soundPath];

    if (!animalSound) {
        return;
    }

    if (currentAnimalSound) {
        currentAnimalSound.pause();
        currentAnimalSound.currentTime = 0;
    }

    animalSound.currentTime = 0;
    animalSound.play();
    currentAnimalSound = animalSound;
    showJumpEffect(card);
}

function showJumpEffect(card) {
    card.classList.remove("active");

    setTimeout(function () {
        card.classList.add("active");
    }, 10);
}

function findCardByKey(pressedKey) {
    var matchingCard = null;

    for (var i = 0; i < animalCards.length; i++) {
        var animalKey = animalCards[i].dataset.key;

        if (animalKey.toLowerCase() === pressedKey.toLowerCase()) {
            matchingCard = animalCards[i];
        }
    }

    return matchingCard;
}

function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        musicButton.textContent = "Play Jungle Music";
        isMusicPlaying = false;
    } else {
        backgroundMusic.play();
        musicButton.textContent = "Pause Jungle Music";
        isMusicPlaying = true;
    }
}

// Try to start the background music. Some browsers block this until the user clicks.
function tryAutoplayMusic() {
    backgroundMusic.play().then(function () {
        musicButton.textContent = "Pause Jungle Music";
        isMusicPlaying = true;
    }).catch(function () {
        musicButton.textContent = "Play Jungle Music";
        isMusicPlaying = false;
    });
}

// Add click listeners to all animal cards with a loop.
for (var i = 0; i < animalCards.length; i++) {
    animalSounds[animalCards[i].dataset.sound] = new Audio(animalCards[i].dataset.sound);

    animalCards[i].addEventListener("click", function () {
        playAnimalSound(this);
    });

    animalCards[i].addEventListener("animationend", function () {
        this.classList.remove("active");
    });
}

document.addEventListener("keydown", function (event) {
    var matchingCard = findCardByKey(event.key);

    if (matchingCard !== null) {
        playAnimalSound(matchingCard);
    }
});

musicButton.addEventListener("click", toggleBackgroundMusic);

tryAutoplayMusic();
