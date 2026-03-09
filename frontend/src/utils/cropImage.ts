export const getCroppedImg = async (
  imageSrc: string, 
  pixelCrop: any, 
  targetSize = 500 // We force the output to 500x500 pixels
): Promise<Blob> => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('No 2d context');

  // Set the actual output size
  canvas.width = targetSize;
  canvas.height = targetSize;

  // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,            // Destination X
    0,            // Destination Y
    targetSize,   // Destination Width (Resizing happens here)
    targetSize    // Destination Height (Resizing happens here)
  );

  return new Promise((resolve) => {
    // We export as JPEG with 0.8 quality to further reduce file size
    canvas.toBlob((blob) => {
      if (!blob) throw new Error('Canvas is empty');
      resolve(blob);
    }, 'image/jpeg', 0.8);
  });
};