import * as ftp from 'basic-ftp';

class FtpService {
  constructor() {
    this.config = {
      host: import.meta.env.VITE_FTP_HOST || "s166.7artisan.cloud",
      user: import.meta.env.VITE_FTP_USER || "ehoxgucq",
      password: import.meta.env.VITE_FTP_PASS || "0Wy3u1ji4O",
      secure: true
    };
    this.baseUrl = 'https://blueferret.mbsrv.net';
  }

  async uploadImage(imageBlob, filename) {
    const client = new ftp.Client();
    client.ftp.verbose = true; // デバッグ用

    try {
      console.log('FTP接続開始');
      await client.access(this.config);
      
      // public_htmlに移動
      console.log('public_htmlに移動');
      await client.cd('public_html');
      
      // quiz-imagesディレクトリに移動（なければ作成）
      try {
        await client.cd('quiz-images');
      } catch {
        console.log('quiz-imagesディレクトリを作成');
        await client.send('MKD quiz-images');
        await client.cd('quiz-images');
      }

      // BlobをArrayBufferに変換
      console.log('画像データを変換');
      const arrayBuffer = await imageBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // ファイルをアップロード
      console.log('ファイルアップロード開始:', filename);
      await client.uploadFrom(buffer, filename);
      console.log('アップロード完了');

      // 完全なURLを返す
      const imageUrl = this.getImageUrl(filename);
      console.log('生成されたURL:', imageUrl);
      
      return imageUrl;

    } catch (error) {
      console.error('FTPエラー:', error);
      throw error;
    } finally {
      client.close();
      console.log('FTP接続クローズ');
    }
  }

  getImageUrl(filename) {
    return `${this.baseUrl}/quiz-images/${filename}`;
  }

  // 画像の存在確認
  async checkImageExists(filename) {
    try {
      const response = await fetch(this.getImageUrl(filename));
      return response.ok;
    } catch {
      return false;
    }
  }

  // ファイル名の生成
  generateFilename(prefix = 'quiz-result') {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `${prefix}-${timestamp}-${random}.png`;
  }
}

export const ftpService = new FtpService();