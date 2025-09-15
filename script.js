const lyrics = [
  { text: "Kapkara gözlerle yaktın sineden", time: 45 },
  { text: "Aşkınla tutuşup yandım Çingene'm", time: 49 },
  { text: "Ruhumu koparıp aldın bedenden", time: 53 },
  { text: "Uğruna sararıp soldum Çingene'm", time: 57 },
  { text: "Karanlık gecede ateşin başında", time: 61 },
  { text: "Takınır zilleri, oynar çingenem", time: 65 },
  { text: "Savurur saçlarını esen rüzgârla", time: 69 },
  { text: "Bir deli sevdaya salar Çingene'm", time: 73 },
  { text: "Bil ki benim için çok degerlisin...", time: 77 }
];

function changeTheme(theme) {
  document.body.className = `mektup-page theme-${theme}`;
  localStorage.setItem('selectedTheme', theme);
  updateSymbolColors(theme);
}

function updateSymbolColors(theme) {
  const symbols = document.querySelectorAll('.symbol');
  const color = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  symbols.forEach(symbol => {
    symbol.style.fill = color;
  });
}

function createSymbol() {
  const numSymbols = Math.floor(Math.random() * 2) + 2;
  for (let i = 0; i < numSymbols; i++) {
    const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    symbol.setAttribute('class', 'symbol');
    const size = 24 + Math.random() * 16;
    symbol.setAttribute('width', size);
    symbol.setAttribute('height', size);
    symbol.setAttribute('viewBox', '0 0 24 24');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const random = Math.random();
    let pathData;

    if (random < 0.4) {
      pathData = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
    } else if (random < 0.6) {
      pathData = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';
    } else if (random < 0.8) {
      pathData = 'M12 2c-1.5 0-2.8.8-3.5 2C7.7 5.2 7 6.6 7 8c0 2.2 1.8 4 4 4 .3 1.1 1.2 2 2.3 2.3 1.2-.3 2.1-1.2 2.4-2.3 2.2 0 4-1.8 4-4 0-1.4-.7-2.8-1.5-4C15.2 2.8 13.5 2 12 2z';
    } else if (random < 0.9) {
      pathData = 'M12 2c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10c0-1.3-.3-2.6-.8-3.8C19.4 4.8 16 2 12 2z';
    } else {
      pathData = 'M12 3c-4.4 0-8 3.6-8 8s3.6 8 8 8c1.7 0 3.3-.5 4.7-1.4l3.7 3.7 1.4-1.4-3.7-3.7c.9-1.4 1.4-3 1.4-4.7 0-4.4-3.6-8-8-8z';
    }

    path.setAttribute('d', pathData);
    symbol.appendChild(path);
    symbol.style.left = `${Math.random() * 100}vw`;
    symbol.style.top = `100vh`;
    symbol.style.animationDuration = `${2 + Math.random() * 3}s`;
    symbol.style.animationName = 'romanticFloat';
    document.querySelector('.symbol-container').appendChild(symbol);
    setTimeout(() => symbol.remove(), 5000);
  }
}

const trail = document.querySelector('.cursor-trail');
function addTrail(x, y) {
  const spark = document.createElement('div');
  spark.className = 'trail-spark';
  spark.style.left = `${x}px`;
  spark.style.top = `${y}px`;
  trail.appendChild(spark);
  setTimeout(() => spark.remove(), 400);
}

document.addEventListener('mousemove', (e) => {
  addTrail(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  addTrail(touch.clientX, touch.clientY);
}, { passive: true });

const audio = document.getElementById('bgMusic');
const lyricsContainer = document.querySelector('.lyrics-container');

function displayLyrics() {
  if (!lyricsContainer) {
    console.error('Lyrics container bulunamadı!');
    return;
  }

  lyricsContainer.innerHTML = '';
  const lyricElement = document.createElement('div');
  lyricElement.classList.add('lyrics-line');
  lyricElement.style.position = 'absolute';
  lyricElement.style.left = '50%';
  lyricElement.style.transform = 'translateX(-50%)';
  lyricElement.style.opacity = '0.5';
  lyricElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  lyricElement.textContent = lyrics[0].text;
  lyricsContainer.appendChild(lyricElement);

  audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    let activeLyric = null;

    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time && (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)) {
        activeLyric = lyrics[i];
        break;
      }
    }

    if (activeLyric && lyricElement.textContent !== activeLyric.text) {
      console.log(`Aktif lyric: ${activeLyric.text}, Zaman: ${currentTime}`);
      lyricElement.style.opacity = '0';
      lyricElement.style.transform = 'translateX(-50%) scale(0.8)';
      setTimeout(() => {
        lyricElement.textContent = activeLyric.text;
        lyricElement.style.opacity = '1';
        lyricElement.style.transform = 'translateX(-50%) scale(1)';
        lyricElement.classList.add('active');
      }, 500);
    } else if (!activeLyric) {
      lyricElement.style.opacity = '0.5';
      lyricElement.style.transform = 'translateX(-50%) scale(0.8)';
      lyricElement.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'neon-pink';
  changeTheme(savedTheme);

  audio.volume = 1.0;
  audio.currentTime = 44;

  const playAudio = () => {
    audio.play().then(() => {
      console.log('Audio oynatılıyor, zaman: ' + audio.currentTime);
      document.body.removeEventListener('click', playAudio);
      document.body.removeEventListener('touchstart', playAudio);
    }).catch((err) => {
      console.error('Audio oynatma hatası:', err);
      document.body.addEventListener('click', playAudio, { once: true });
      document.body.addEventListener('touchstart', playAudio, { once: true });
    });
  };

  audio.addEventListener('canplaythrough', () => {
    console.log('Audio canplaythrough tetiklendi');
    playAudio();
    displayLyrics();
  });

  setInterval(createSymbol, 1500);
});