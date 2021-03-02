import { getCustomRepository } from "typeorm";
import { Request, Response } from 'express';
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    async execute(request: Request, response: Response) {

        //GET Parametros
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository); //repo

        //pesquisa surveyUser 
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) {
            return response.status(400).json({
                error: "Survey User does not exists!"
            });
        }

        surveyUser.value = Number(value);
        await surveysUsersRepository.save(surveyUser);
        return response.json(surveyUser);

    }
}

export { AnswerController };