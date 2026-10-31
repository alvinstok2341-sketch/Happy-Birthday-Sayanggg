
// ELEMENT WEBSITE
const cover = document.getElementById("cover");
const mainScreen = document.getElementById("mainScreen");
const openGift = document.getElementById("openGift");

const bgMusic = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

const openMessages = document.getElementById("openMessages");
const messageOpenWrap = document.getElementById("messageOpenWrap");
const letterList = document.getElementById("letterList");

const videoModal = document.getElementById("videoModal");
const memoryVideo = document.getElementById("memoryVideo");
const closeVideo = document.getElementById("closeVideo");

let musicWasPlaying = false;


// BUKA HADIAH
openGift.addEventListener("click", () => {
  cover.classList.remove("active");
  mainScreen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  bgMusic.play().catch(() => {
    console.log("Musik belum bisa diputar.");
  });
});


// TOMBOL MUSIK
musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  } else {
    bgMusic.pause();
  }
});


// BUKA SEMUA PESAN
openMessages.addEventListener("click", () => {
  letterList.classList.remove("hidden");
  letterList.classList.add("show");

  messageOpenWrap.style.display = "none";

  setTimeout(() => {
    letterList.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);
});


// MEMBUKA VIDEO
document.querySelectorAll(".play-video").forEach((button) => {
  button.addEventListener("click", async () => {
    const videoSource = button.dataset.video;

    // Simpan kondisi musik sebelum video dibuka
    musicWasPlaying = !bgMusic.paused;

    // Hentikan musik latar
    bgMusic.pause();

    // Hentikan dan bersihkan video sebelumnya
    memoryVideo.pause();
    memoryVideo.removeAttribute("src");
    memoryVideo.load();

    // Pastikan suara video aktif
    memoryVideo.muted = false;
    memoryVideo.defaultMuted = false;
    memoryVideo.volume = 1;

    // Pasang video baru
    memoryVideo.src = videoSource;
    videoModal.classList.add("active");

    // Muat dan putar video
    memoryVideo.load();

    try {
      await memoryVideo.play();
    } catch (error) {
      console.log("Video belum bisa diputar otomatis:", error);
      console.log("Silakan tekan tombol Play pada video.");
    }
  });
});


// MENUTUP VIDEO
function closeVideoModal() {
  if (!videoModal.classList.contains("active")) {
    return;
  }

  // Hentikan video
  memoryVideo.pause();
  memoryVideo.removeAttribute("src");
  memoryVideo.load();

  // Tutup modal
  videoModal.classList.remove("active");

  // Kembalikan musik jika sebelumnya sedang diputar
  if (musicWasPlaying) {
    bgMusic.play().catch(() => {
      console.log("Musik latar gagal dilanjutkan.");
    });
  }

  musicWasPlaying = false;
}


// TOMBOL CLOSE VIDEO
closeVideo.addEventListener("click", closeVideoModal);


// KLIK AREA LUAR VIDEO UNTUK MENUTUP
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) {
    closeVideoModal();
  }
});


// TOMBOL ESCAPE UNTUK MENUTUP VIDEO
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeVideoModal();
  }
});


// ANIMASI HATI MELAYANG
const heartsContainer = document.getElementById("hearts");

function createHeart() {
  const heart = document.createElement("span");

  heart.classList.add("floating-heart");
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";

  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  heart.style.animationDuration = (6 + Math.random() * 6) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 12000);
}

setInterval(createHeart, 650);
