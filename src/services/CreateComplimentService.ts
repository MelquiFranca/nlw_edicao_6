import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface ICreateComplimentService {
    tag_id: string
    user_sender: string
    user_receiver: string
    message: string
}

class CreateComplimentService {
    async execute({  tag_id, user_sender, user_receiver, message }: ICreateComplimentService) {
        const complimentsRepsitories = getCustomRepository(ComplimentRepositories)
        const usersRepositories = getCustomRepository(UsersRepositories)

        if(user_sender === user_receiver) throw new Error("Incorrect User Receiver")

        const userReceiverExists = await usersRepositories.findOne(user_receiver)
        if(!userReceiverExists) throw new Error("User Receiver does not exists")

        const compliment = complimentsRepsitories.create({            
            tag_id, 
            user_sender, 
            user_receiver, 
            message
        })

        await complimentsRepsitories.save(compliment)
    }
}

export { 
    CreateComplimentService
}