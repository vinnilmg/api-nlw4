import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {

    async create(request: Request, response: Response) {
        const { title, description } = request.body;

        const surveysRepo = getCustomRepository(SurveysRepository);

        //objeto survey
        const survey = surveysRepo.create({
            title,
            description
        });

        await surveysRepo.save(survey);

        return response.status(201).json(survey);
    }

    async show(request: Request, response: Response) {
        const surveysRepo = getCustomRepository(SurveysRepository);

        const all = await surveysRepo.find();

        return response.json(all);
    }

}

export { SurveysController };