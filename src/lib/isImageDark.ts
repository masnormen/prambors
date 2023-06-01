export function isImageDark(imageSrc: string): Promise<boolean> {
  const fuzzy = 0.1;

  const img = document.createElement('img');
  img.src = imageSrc;
  img.crossOrigin = 'anonymous';
  img.style.display = 'none';

  document.body.appendChild(img);

  return new Promise((resolve) => {
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      let ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0);
      const { data: rgbaData } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      let lightPixelCount = 0;
      let darkPixelCount = 0;

      for (let i = 0; i < rgbaData.length; i += 4) {
        let [r, g, b] = [rgbaData[i], rgbaData[i + 1], rgbaData[i + 2]];

        if ((r + g + b) / 3 < 128) {
          darkPixelCount += 1;
        } else {
          lightPixelCount += 1;
        }
      }

      let dl_diff = (lightPixelCount - darkPixelCount) / (img.width * img.height);

      document.body.removeChild(img);

      return resolve(dl_diff + fuzzy < 0);
    };
  });
}
