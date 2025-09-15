<?php
$isim = htmlspecialchars($_GET["isim"] ?? "Sevgilim");
$ozelNot = "Seninle her şey daha anlamlı, $isim 💖";

$sarkiSozleri = [
  "Yepyeni yaşlarımda, belki gözyaşlarımda",
  "Senle ağlasam",
  "En güzel anlarımda, belki zor yanlarımda",
  "Hiç bırakmasan",

  "Yolumu sen'le arasam, aşka or'da rastlasam",
  "Sana tutulunca silindi hafızam",
  "Hatırlasa ya bi' an",
  "Tanırdım öyle ya sana dokununca",
  "Vurunca yansıman sıfırladın şu an",
  "Tutuştuk öyle ya, o ateşi yakınca",

  "Sana hastayım anlasan, ah",
  "Şaka yapmadım anlasan, ah",
  "Bana sabıka bağlasan, ah",
  "Bi' de sormadan harcasan, ah",

  "Yolumu sen'le arasam, aşka or'da rastlasam",
  "Sana tutulunca silindi hafızam",
  "Hatırlasa ya bi' an",
  "Tanırdım öyle ya sana dokununca",
  "Vurunca yansıman sıfırladın şu an",
  "Tutuştuk öyle ya, o ateşi yakınca",

  "Sana hastayım anlasan, ah",
  "Şaka yapmadım anlasan, ah",
  "Bana sabıka bağlasan, ah",
  "Bi' de sormadan harcasan, ah",

  "Sana hastayım, ah, ah, ah",
  "Sana hastayım, ah, ah, ah"
];
?>
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>💌 Mektubun Hazır</title>
  <link rel="stylesheet" href="style.css" />
  <style>
    #lyrics-container {
      margin-top: 30px;
      min-height: 80px;
      font-size: 1.5rem;
      color: #c71585;
      font-weight: bold;
      text-align: center;
      position: relative;
      height: 80px;
      overflow: hidden;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      white-space: normal;
      word-break: break-word;
      padding: 0 10px;
    }

    .lyrics-line {
      position: absolute;
      width: 100%;
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInOut 4s ease-in-out forwards;
    }

    @keyframes fadeInOut {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      15% {
        opacity: 1;
        transform: translateY(0);
      }
      85% {
        opacity: 1;
        transform: translateY(0);
      }
      100% {
        opacity: 0;
        transform: translateY(-30px);
      }
    }
    .mektup p {
      white-space: normal;
      line-height: 1.5;
      margin-top: 20px;
    }

    @media (max-width: 600px) {
      #lyrics-container {
        font-size: 1.2rem;
        min-height: 100px;
      }

      .lyrics-line {
        font-size: 1.3rem !important;
      }
    }
  </style>
</head>
<body class="mektup-page">

  <div class="kelebek-container">
    <div class="kelebek k1">🦋</div>
    <div class="kelebek k2">🦋</div>
    <div class="kelebek k3">🦋</div>
    <div class="kelebek k4">🦋</div>
    <div class="kelebek k5">🦋</div>
  </div>

  <div class="mektup-container">
    <div class="kurdele"></div>
    <div class="mektup">
      <h2><?= $isim ?>,</h2>

      <div id="lyrics-container"></div>

      <p>
        Bu mektubu kalbimle yazdım. Her satırı sana olan sevgimle dolu.
        Seninle geçirdiğim her an, hayatımın en güzel anısı oluyor.
        Bu mektup, kalbimden çıkan en içten duyguların yansımasıdır.💌🦋🎀
        Coder @by_.ram
        
      </p>

      <div class="ozel-not">
        <strong>Not:</strong> <?= $ozelNot ?>
      </div>
    </div>
  </div>

  <audio id="bgMusic" autoplay loop>
    <source src="n.mp3" type="audio/mpeg" />
    Tarayıcınız audio etiketini desteklemiyor.
  </audio>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const audio = document.getElementById('bgMusic');
      const lyricsContainer = document.getElementById('lyrics-container');
      const lyrics = <?= json_encode($sarkiSozleri) ?>;
      let currentLine = 0;
      let intervalId;

      audio.volume = 0.2;

      audio.play().catch(() => {
        document.body.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });

      function showLine(index) {
        lyricsContainer.innerHTML = '';

        const lineText = lyrics[index]?.trim() || '';
        const lineDiv = document.createElement('div');
        lineDiv.className = 'lyrics-line';
        lineDiv.textContent = lineText !== '' ? lineText : ' ';
        lyricsContainer.appendChild(lineDiv);

        if (lineText === "Bi' de sormadan harcasan, ah") {
          clearInterval(intervalId);
          setTimeout(() => {
            lyricsContainer.innerHTML = '';
            const loveDiv = document.createElement('div');
            loveDiv.className = 'lyrics-line';

            loveDiv.style.animation = 'none';
            loveDiv.style.opacity = '1';
            loveDiv.style.transform = 'translateY(0)';
            loveDiv.style.color = '#e91e63';
            loveDiv.style.fontSize = '1.6rem';
            loveDiv.style.whiteSpace = 'normal';
            loveDiv.style.wordBreak = 'break-word';
            loveDiv.style.padding = '0 10px';

            loveDiv.textContent = `Sadece seni çok ama çok seviyorum, bil bunu <?= $isim ?> 💖`;
            lyricsContainer.appendChild(loveDiv);
          }, 4000);
        }
      }

      setTimeout(() => {
        showLine(currentLine);
        intervalId = setInterval(() => {
          currentLine++;
          if (currentLine < lyrics.length) {
            showLine(currentLine);
          }
        }, 4000);
      }, 18000);
    });
  </script>

</body>
</html>
