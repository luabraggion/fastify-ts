import { FastifyInstance } from 'fastify';

import { UserController } from '../controllers/user.controller.js';
import { UserCreate } from '../interfaces/user.interface.js';
export async function userRoutes(fastify: FastifyInstance) {
  const userController = new UserController();
  fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
    const { name, email, password, isActive, isAdmin, profilePictureUrl } =
      req.body;

    const data = await userController.create({
      name,
      email,
      password,
      isActive,
      isAdmin,
      profilePictureUrl,
    });

    return reply.status(201).send(data);
  });

  fastify.get('/', async (req, reply) => {
    reply.send({
      message: 'List of users',
    });
  });

  // fastify.get<{ Querystring: UserQuerystring }>("/", async (req, reply) => {
  //   const { email } = req.query;

  //   if (!email) {
  //     return reply.status(400).send({ error: "Email query parameter is required" });
  //   }

  //   const user = await userController.findByEmail(email);

  //   if (!user) {
  //     return reply.status(404).send({ error: "User not found" });
  //   }

  //   return reply.send(user);
  // });

  fastify.put<{ Params: { id: string } }>('/:id', async (req, reply) => {
    const userId = req.params.id;
    const userData = req.body;
    reply.send({ userId, userData });
    // Here you would typically call a service to update the user
    // For example: const updatedUser = await userService.update(userId, userData);
    // reply.send({ message: `User with ID ${userId} updated successfully` });
  });

  // fastify.delete<{ Params: { id: string } }>(
  //   "/users/:id",
  //   async (req, reply) => {
  //     const userId = req.params.id;
  //     // Here you would typically call a service to delete the user
  //     // For example: await userService.delete(userId);
  //     reply.status(204).send();
  //   }
  // );
}
