// @ts-nocheck
import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const QuizResult = ({ score, total, wrongQuestions, onRetry }) => {
  const handleShareToTwitter = () => {
    const wrongQuestionsText = wrongQuestions.length > 0 
      ? `\n間違えた問題：${wrongQuestions.join(', ')}番` 
      : '\n全問正解！';
    
    const shareText = `科学知識テストで${score}/${total}点でした！${wrongQuestionsText}`;
    const twitterUrl = `https://twitter.com/share?text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">テスト結果</h2>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">
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

          <div className="flex flex-col gap-4 items-center pt-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizResult;