import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { hygieneTestApi } from "@/Backend/api/hygieneTestApi";
import { useToast } from "@/hooks/use-toast";

type FarmType = 'poultry' | 'cattle' | null;

const HygieneTest = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [farmType, setFarmType] = useState<FarmType>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const poultryQuestions = [
    { question: 'poultryQ1', options: ['poultryQ1A1', 'poultryQ1A2', 'poultryQ1A3', 'poultryQ1A4'] },
    { question: 'poultryQ2', options: ['poultryQ2A1', 'poultryQ2A2', 'poultryQ2A3', 'poultryQ2A4'] },
    { question: 'poultryQ3', options: ['poultryQ3A1', 'poultryQ3A2', 'poultryQ3A3', 'poultryQ3A4'] },
    { question: 'poultryQ4', options: ['poultryQ4A1', 'poultryQ4A2', 'poultryQ4A3', 'poultryQ4A4'] },
    { question: 'poultryQ5', options: ['poultryQ5A1', 'poultryQ5A2', 'poultryQ5A3', 'poultryQ5A4'] },
  ];

  const cattleQuestions = [
    { question: 'cattleQ1', options: ['cattleQ1A1', 'cattleQ1A2', 'cattleQ1A3', 'cattleQ1A4'] },
    { question: 'cattleQ2', options: ['cattleQ2A1', 'cattleQ2A2', 'cattleQ2A3', 'cattleQ2A4'] },
    { question: 'cattleQ3', options: ['cattleQ3A1', 'cattleQ3A2', 'cattleQ3A3', 'cattleQ3A4'] },
    { question: 'cattleQ4', options: ['cattleQ4A1', 'cattleQ4A2', 'cattleQ4A3', 'cattleQ4A4'] },
    { question: 'cattleQ5', options: ['cattleQ5A1', 'cattleQ5A2', 'cattleQ5A3', 'cattleQ5A4'] },
  ];

  const questions = farmType === 'poultry' ? poultryQuestions : cattleQuestions;

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit the test results to the backend
      setIsSubmitting(true);
      try {
        const score = calculateScore();
        const percentage = score;
        await hygieneTestApi.submit({
          farmType: farmType!,
          answers,
          score,
        });
        toast({
          title: "Test Submitted",
          description: "Your hygiene test results have been saved successfully.",
        });
        setShowResults(true);
      } catch (error) {
        console.error('Failed to submit test:', error);
        toast({
          title: "Submission Failed",
          description: "There was an error saving your test results. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const calculateScore = () => {
    const totalScore = answers.reduce((sum, answer) => sum + (3 - answer), 0);
    const percentage = (totalScore / (questions.length * 3)) * 100;
    return Math.round(percentage);
  };

  const getRecommendations = (score: number) => {
    if (score >= 85) {
      return [
        t('rec_excellent_1'),
        t('rec_excellent_2'),
        t('rec_excellent_3'),
        t('rec_excellent_4')
      ];
    } else if (score >= 60) {
      return [
        t('rec_good_1'),
        t('rec_good_2'),
        t('rec_good_3'),
        t('rec_good_4'),
        t('rec_good_5')
      ];
    } else if (score >= 40) {
      return [
        t('rec_moderate_1'),
        t('rec_moderate_2'),
        t('rec_moderate_3'),
        t('rec_moderate_4'),
        t('rec_moderate_5'),
        t('rec_moderate_6')
      ];
    } else {
      return [
        t('rec_poor_1'),
        t('rec_poor_2'),
        t('rec_poor_3'),
        t('rec_poor_4'),
        t('rec_poor_5'),
        t('rec_poor_6'),
        t('rec_poor_7'),
        t('rec_poor_8')
      ];
    }
  };

  const getRiskLevel = (score: number) => {
    if (score >= 85) return { level: t('excellent'), color: 'text-green-600', message: t('excellentMsg') };
    if (score >= 60) return { level: t('good'), color: 'text-blue-600', message: t('goodMsg') };
    if (score >= 40) return { level: t('moderate'), color: 'text-yellow-600', message: t('moderateMsg') };
    return { level: t('poor'), color: 'text-red-600', message: t('poorMsg') };
  };

  const resetTest = () => {
    setFarmType(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  if (!farmType) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl">{t('testTitle')}</CardTitle>
              <CardDescription className="text-lg">{t('selectFarmType')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                className="w-full py-8 text-lg" 
                onClick={() => setFarmType('poultry')}
              >
                {t('poultryFarm')}
              </Button>
              <Button 
                className="w-full py-8 text-lg" 
                variant="secondary"
                onClick={() => setFarmType('cattle')}
              >
                {t('cattleFarm')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const risk = getRiskLevel(score);
    const recommendations = getRecommendations(score);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">{t('resultsTitle')}</CardTitle>
              <div className="space-y-4">
                <div>
                  <p className="text-lg mb-2">{t('riskLevel')}</p>
                  <p className={`text-5xl font-bold ${risk.color}`}>{score}%</p>
                  <p className={`text-2xl font-semibold mt-2 ${risk.color}`}>{risk.level}</p>
                </div>
                <p className="text-lg text-muted-foreground">{risk.message}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  {t('recommendations')}
                </h3>
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full" onClick={resetTest}>
                {t('backToTest')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-3xl">
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <Progress value={progress} className="w-full" />
              <CardDescription className="text-center">
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
              <CardTitle className="text-2xl hover:text-pink-200 transition-colors">
                {t(questions[currentQuestion].question)}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              key={currentQuestion}
              value={answers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-pink-200 cursor-pointer">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} className="data-[state=checked]:bg-black data-[state=checked]:border-black" />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-base">
                    {t(option)}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            <Button
              className="w-full"
              onClick={handleNext}
              disabled={answers[currentQuestion] === undefined || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                currentQuestion < questions.length - 1 ? t('nextQuestion') : t('submitTest')
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HygieneTest;
