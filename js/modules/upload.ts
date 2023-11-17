const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
const imgUploadInput: HTMLInputElement | null = document.querySelector('.img-upload__input');
const imgUploadPreview: HTMLImageElement | null = document.querySelector('.img-upload__preview img');

imgUploadInput?.addEventListener('change', () => {
  if (imgUploadInput.files) {
    const file = imgUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const checksType = FILE_TYPES.some((it) => fileName.endsWith(it));
    if (checksType && imgUploadPreview) {
      imgUploadPreview.src = URL.createObjectURL(file);
    }
  }
});
