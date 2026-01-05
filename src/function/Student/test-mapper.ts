// src/function/Student/test-mapper.ts
import { type Test as AppTest, type Question as AppQuestion, type Answer as AppAnswer } from "@/types";
import { type TestWithAccess as ApiTestWithAccess, type Question as ApiQuestion } from "@/api/real/types";

export const mapApiTestToAppTest = (apiTest: ApiTestWithAccess): AppTest => {
  const appQuestions: AppQuestion[] = apiTest.questions?.map(apiQuestion => {
    const appAnswers: AppAnswer[] = apiQuestion.options.map(option => ({
      id: option.key,
      text: option.text,
    }));

    return {
      id: apiQuestion.id,
      text: apiQuestion.text,
      answers: appAnswers,
      correctAnswerId: apiQuestion.correctAnswer, // This is the key of the correct answer
      options: apiQuestion.options.map(option => option.text), // Options as string array
      correctAnswer: apiQuestion.correctAnswer, // Storing the key here for getOptionText
    };
  }) || [];

  return {
    id: apiTest.testId,
    teacherId: "N/A", // Not available in ApiTestWithAccess
    title: apiTest.nomi,
    questions: appQuestions,
    durationInMinutes: undefined, // Not available
    status: undefined, // Not available
    subject: apiTest.subject,
    description: undefined, // Not available
    questionCount: apiTest.questionCount,
    assignedStudents: undefined, // Not available
    createdAt: undefined, // Not available
    updatedAt: undefined, // Not available
    dueDate: undefined, // Not available
  };
};
