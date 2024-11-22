class ImageService {
    constructor() {
      this.baseUrl = 'https://blueferret.mbsrv.net';
    }
  
    async convertToDataUrl(blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
  
    generateFilename(prefix = 'quiz-result') {
      const timestamp = new Date().getTime();
      const random = Math.floor(Math.random() * 1000);
      return `${prefix}-${timestamp}-${random}.png`;
    }
  
    getImageUrl(filename) {
      return `${this.baseUrl}/quiz-images/${filename}`;
    }
  }
  
  export const imageService = new ImageService();