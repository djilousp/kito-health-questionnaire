import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";

const fetchQuestionnaire = async (questionnaireId: string) => {
  const response = await axiosInstance.get(
    `/api/questionnaires/${questionnaireId}`
  ); //  make necessary adjustments
  console.log("your dataa ============", response.data);
  return response.data;
};

export const useFetchQuiz = (questionnaireId: string) => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: () => fetchQuestionnaire(questionnaireId),
  });
};
