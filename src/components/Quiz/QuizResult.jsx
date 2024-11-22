import React, { useRef, useState } from 'react';  // useStateを追加
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import html2canvas from 'html2canvas';
import { imageService } from '../../services/imageService';

const QuizResult = function QuizResult({ score, total, wrongQuestions, onRetry }) {
  const resultCardRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);  // プレビュー用のstate

  const generateAndGetImageUrl = async () => {
    try {
      console.log('画像生成開始');
      const resultElement = resultCardRef.current.querySelector('.result-content');
      
      const canvas = await html2canvas(resultElement, {
        backgroundColor: '#ffffff',
        scale: 2,
        logging: true,
      });
      console.log('Canvas生成完了', canvas.width, 'x', canvas.height);

      // キャンバスをBlobに変換
      const blob = await new Promise(resolve => {
        canvas.toBlob(resolve, 'image/png', 0.9);
      });
      console.log('Blob生成完了:', blob.size, 'bytes');

      // Base64 URLに変換
      const dataUrl = await imageService.convertToDataUrl(blob);
      console.log('データURL生成完了');

      // プレビュー用にURLを保存
      setPreviewUrl(dataUrl);

      return dataUrl;
    } catch (error) {
      console.error('画像生成エラー:', error);
      return null;
    }
  };

  const handleShareToTwitter = async () => {
    try {
      console.log('シェア処理開始');
      const shareButtons = resultCardRef.current.querySelector('.share-buttons');
      shareButtons.style.display = 'none';

      const imageUrl = await generateAndGetImageUrl();
      console.log('画像URL生成完了');

      shareButtons.style.display = 'flex';

      const wrongQuestionsText = wrongQuestions.length > 0 
        ? `\n\n間違えた問題：${wrongQuestions.join(', ')}番` 
        : '\n\n全問正解！🎉';

      const shareText = `科学知識テストで${total}点中${score}点でした！${wrongQuestionsText}`;
      const appUrl = 'https://blueferret.mbsrv.net/quiz-app/';

      // Twitter共有URLを作成
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(appUrl)}`;
      console.log('最終的なTwitter共有URL:', twitterUrl);

      window.open(twitterUrl, '_blank');

    } catch (error) {
      console.error('シェアエラー:', error);
      alert('シェアに失敗しました。もう一度お試しください。');
    }
  };

  return (
    <Card className="max-w-2xl mx-auto" ref={resultCardRef}>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">テスト結果</h2>
      </CardHeader>
      <CardContent>
        <div className="result-content space-y-6 bg-white p-6 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl mb-4">あなたの科学知識テストの結果は...</h3>
            <p className="text-4xl font-bold mb-2">
              {score} / {total}点
            </p>
            <p className="text-lg text-gray-600">
              正答率: {Math.round((score / total) * 100)}%
            </p>
          </div>

          {wrongQuestions.length > 0 && (
            <div className="border-t border-b py-4">
              <p className="font-semibold mb-2">間違えた問題</p>
              <p className="text-red-600">
                {wrongQuestions.join(', ')}番
              </p>
            </div>
          )}
        </div>

        <div className="share-buttons flex flex-col gap-4 items-center pt-4">
          <Button
            onClick={handleShareToTwitter}
            className="bg-blue-500 hover:bg-blue-600 w-full max-w-xs"
          >
            結果をXでシェア
          </Button>
          <Button
            onClick={onRetry}
            variant="outline"
            className="w-full max-w-xs"
          >
            もう一度挑戦する
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResult;