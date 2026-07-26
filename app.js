// ===== THEME =====
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
let dark = localStorage.getItem('theme') === 'dark';
function applyTheme() {
  root.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeToggle.querySelector('.theme-icon').textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
applyTheme();
themeToggle.addEventListener('click', () => { dark = !dark; applyTheme(); });

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-to-top').classList.toggle('visible', window.scrollY > 300);
});

// ===== BACK TO TOP =====
document.getElementById('back-to-top').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));

// ===== SEARCH =====
const searchOverlay = document.getElementById('search-overlay');
document.getElementById('search-btn').addEventListener('click', () => { searchOverlay.classList.add('active'); document.getElementById('search-input').focus(); });
document.getElementById('search-close').addEventListener('click', () => searchOverlay.classList.remove('active'));
searchOverlay.addEventListener('click', e => { if (e.target === searchOverlay) searchOverlay.classList.remove('active'); });

// ===== CATEGORY FILTER =====
const pills = document.querySelectorAll('.cat-pill');
const cards = document.querySelectorAll('.card');
pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    const cat = pill.dataset.cat;
    cards.forEach(card => {
      card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
    });
    showToast(cat === 'all' ? 'Showing all vibes ✨' : `Filtered by ${pill.textContent}`);
  });
});

// ===== LIKE & SAVE =====
function setupCardActions() {
  document.querySelectorAll('.card-like').forEach(btn => {
    btn.addEventListener('click', () => {
      const liked = btn.dataset.liked === 'true';
      btn.dataset.liked = !liked;
      btn.textContent = liked ? '♡' : '♥';
      btn.style.color = liked ? '' : '#e74c3c';
      showToast(liked ? 'Removed from likes' : 'Added to likes ♥');
    });
  });
  document.querySelectorAll('.card-save').forEach(btn => {
    btn.addEventListener('click', () => {
      const saved = btn.dataset.saved === 'true';
      btn.dataset.saved = !saved;
      showToast(saved ? 'Removed from saved' : 'Saved! 🔖');
    });
  });
}
setupCardActions();

// ===== FUN FACT SHARE =====
document.getElementById('share-funfact-1')?.addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({ title: 'Fun Fact', text: 'Honey never spoils! 🍯', url: location.href });
  } else {
    navigator.clipboard?.writeText('Honey never spoils! 🍯 — via Everyday Vibes');
    showToast('Fun fact copied! 🧩');
  }
});

// ===== QUOTES =====
const quotes = [
  { text: "Life isn't about finding yourself. It's about creating yourself, one beautiful day at a time.", author: "Unknown" },
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "She remembered who she was and the game changed.", author: "Lalah Delia" },
  { text: "Do more things that make you forget to check your phone.", author: "Unknown" },
  { text: "One day or day one. You decide.", author: "Unknown" },
  { text: "Live in the sunshine, swim in the sea, drink the wild air.", author: "Ralph Waldo Emerson" },
  { text: "Good vibes only — and a really good cup of coffee.", author: "Unknown" },
  { text: "Collect moments, not things.", author: "Unknown" },
  { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush" },
  { text: "Adventure awaits. Go find it. 🌍", author: "Unknown" },
];
let quoteIdx = 0;
const quoteDisplay = document.getElementById('quote-display');
const quoteAuthorDisplay = document.getElementById('quote-author-display');
document.getElementById('new-quote-btn')?.addEventListener('click', () => {
  quoteIdx = (quoteIdx + 1) % quotes.length;
  quoteDisplay.style.opacity = '0';
  setTimeout(() => {
    quoteDisplay.textContent = quotes[quoteIdx].text;
    quoteAuthorDisplay.textContent = `— ${quotes[quoteIdx].author}`;
    quoteDisplay.style.opacity = '1';
    quoteDisplay.style.transition = 'opacity .4s';
  }, 200);
});

// ===== STORIES =====
const storyData = [
  { src: 'assets/card_travel.png', label: '🌍 Travel Diary' },
  { src: 'assets/card_food.png', label: '☕ Brunch Vibes' },
  { src: 'assets/card_vlog.png', label: '🎬 Morning Vlog' },
  { src: 'assets/card_motivation.png', label: '💫 Daily Inspo' },
  { src: 'assets/card_trending.png', label: '🔥 Trending Now' },
  { src: 'assets/hero_lifestyle.png', label: '🌿 Lifestyle' },
];
const storyModal = document.getElementById('story-modal');
const storyModalImg = document.getElementById('story-modal-img');
const storyModalLabel = document.getElementById('story-modal-label');
const storyFill = document.getElementById('story-progress-fill');
let storyTimer = null;

document.querySelectorAll('.story-bubble').forEach((bubble, i) => {
  bubble.addEventListener('click', () => openStory(i));
});
document.getElementById('story-close')?.addEventListener('click', closeStory);
storyModal.addEventListener('click', e => { if (e.target === storyModal) closeStory(); });

function openStory(i) {
  const s = storyData[i];
  storyModalImg.src = s.src;
  storyModalLabel.textContent = s.label;
  storyModal.classList.add('active');
  storyFill.style.width = '0';
  clearTimeout(storyTimer);
  requestAnimationFrame(() => { storyFill.style.width = '100%'; });
  storyTimer = setTimeout(closeStory, 5000);
}
function closeStory() {
  storyModal.classList.remove('active');
  clearTimeout(storyTimer);
  storyFill.style.width = '0';
}

// ===== NEWSLETTER =====
document.getElementById('newsletter-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    showToast('You\'re subscribed! 💌 Welcome to the vibe.');
    document.getElementById('newsletter-email').value = '';
  }
});

// ===== TOAST =====
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===== NAV ACTIVE ON SCROLL =====
const sections = ['hero','featured','categories','stories','vibes','about','newsletter'];
const navLinkEls = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  navLinkEls.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

// ===== COPY IMAGES TO ASSETS =====
// (Assets are served from assets/ folder — handled by file structure)

console.log('✦ Everyday Vibes loaded!');
