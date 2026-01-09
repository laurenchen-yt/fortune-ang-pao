
// External libraries (assuming globally available via script tags in index.html)
declare const confetti: any;

export const playConfetti = () => {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
};

// Audio placeholders - Replace with actual URLs in a real production environment
export const audioAssets = {
  drum: 'https://actions.google.com/sounds/v1/foley/drum_roll.ogg', // 替代：鑼鼓聲
  celebrate: 'https://actions.google.com/sounds/v1/cartoon/clown_horn.ogg', // 替代：恭喜發財/慶祝聲
  click: 'https://actions.google.com/sounds/v1/foley/button_click.ogg'
};

const audioCache: Record<string, HTMLAudioElement> = {};

export const playSound = (key: keyof typeof audioAssets, loop = false) => {
  try {
    if (!audioCache[key]) {
      audioCache[key] = new Audio(audioAssets[key]);
    }
    const sound = audioCache[key];
    sound.loop = loop;
    sound.currentTime = 0;
    sound.play().catch(e => console.warn('Audio play blocked:', e));
    return sound;
  } catch (e) {
    console.error('Audio Error:', e);
    return null;
  }
};

export const stopSound = (key: keyof typeof audioAssets) => {
  if (audioCache[key]) {
    audioCache[key].pause();
    audioCache[key].currentTime = 0;
  }
};
