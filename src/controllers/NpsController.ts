import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { Request, Response } from 'express';

class NpsController {
    async execute(request: Request, response: Response) {

        const { survey_id } = request.params;
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        //apenas quem já respondeu
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value:  Not(IsNull()),
        });

        //variables nps
        const detractor = surveysUsers.filter(
            (survey) => survey.value >= 0 && survey.value <= 6
        ).length;

        const promoters = surveysUsers.filter(
                (survey) => survey.value >= 9 && survey.value <= 10
        ).length;

        const passive = surveysUsers.filter(
            (survey) => survey.value >= 7 && survey.value <= 8
        ).length;

        const totalAnswers = surveysUsers.length;

        //calculo nps
        const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(2));

        return response.json({
            detractor,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        });

    }

}

export { NpsController };