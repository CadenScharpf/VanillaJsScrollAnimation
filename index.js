const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 135;
const currentFrame = index => (
  `./frames/plant_sequence_${index.toString().padStart(3, '0')}.jpg`
)



const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let scale = Math.max(canvas.width / img.width, canvas.height / img.height);
let newWidth = img.width * scale;
let newHeight = img.height * scale;
let offsetX = (canvas.width - img.width * scale) / 2;
let offsetY = ((canvas.height - img.height * scale) / 2)+60;

img.onload = function () {

  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );

  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()

