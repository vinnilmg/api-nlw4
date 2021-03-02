import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class UserController {

    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        //VALIDACOES COM YUP
        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatório"),
            email: yup.string().email("Email incorreto").required("Email é obrigatório")
        });

        try {
            await schema.validate(request.body, {abortEarly: false})
        } catch(err) {
            //return response.status(400).json({error: err});
            throw new AppError(err);
        }

        const usersRepo = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepo.findOne({email});
        //console.log(userAlreadyExists);

        if(userAlreadyExists) {
            throw new AppError("User already exists!");
            //return response.status(400).json({
            //  error: "User already exists!",
            //});
        }

        const user = usersRepo.create({ name, email })
        await usersRepo.save(user);
        return response.status(201).json(user);

    }
}

export { UserController };
