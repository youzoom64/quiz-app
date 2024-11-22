// @ts-nocheck
import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Check, X } from 'lucide-react';
import { quizData } from './quizData';
import QuizResult from './QuizResult';

const ScienceQuiz = () => {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  
  const handleAnswer = (id, value) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    const wrong = [];
    Object.entries(answers).forEach(([id, answer]) => {
      const question = quizData.find(q => q.id === parseInt(id));
      if (question?.answer === answer) {
        correct++;
      } else {
        wrong.push(parseInt(id));
      }
    });
    setScore(correct);
    setWrongQuestions(wrong.sort((a, b) => a - b));
    setShowResults(true);
  };

  const handleRetry = () => {
    setAnswers({});
    setShowResults(false);
    setScore(0);
    setWrongQuestions([]);
  };

  if (showResults) {
    return (
      <QuizResult
        score={score}
        total={quizData.length}
        wrongQuestions={wrongQuestions}
        onRetry={handleRetry}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">科学知識テスト</h1>
          <p className="text-center text-gray-600">
            各問題について、正しければ○、間違っていれば×を選んでください。
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizData.map((question) => (
              <div key={question.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
                  <span className="flex-1">
                    {question.id}. {question.question}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant={answers[question.id] === true ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(question.id, true)}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={answers[question.id] === false ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAnswer(question.id, false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button 
              onClick={calculateScore}
              className="px-6"
              disabled={Object.keys(answers).length !== quizData.length}
            >
              採点する
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScienceQuiz;