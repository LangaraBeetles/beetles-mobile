import api from "@src/services/api";
import {
  ChallengeInputType,
  ChallengeStatusEnum,
} from "@src/interfaces/challenge.types";

const route = "challenges";

export const getChallengeById = async (id: string) => {
  const response = await api.get(`${route}/${id}`);
  return response;
};

export const createChallenge = async (challenge: ChallengeInputType) => {
  const response = await api.post(`${route}`, challenge);
  return response.data;
};

export const getChallenges = async (filterUser: boolean) => {
  const response = await api.get(`${route}/?filterUser=${filterUser}`);
  return response.data;
};

export const getPastChallenges = async (status: ChallengeStatusEnum) => {
  const response = await api.get(`${route}/?filterStatus=${status}`);
  return response.data;
};
