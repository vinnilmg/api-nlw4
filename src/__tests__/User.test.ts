import request  from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database/index';

describe("Users", () => {
    //ANTES DE TUDO RODA MIGRATIONS
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    //DEPOIS DE TUDO
    afterAll(async () => {
        const connection = getConnection();
        await connection.query("DELETE FROM users");
        await connection.close();
    });

    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        });
        expect(response.status).toBe(201);
    });

    it("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        });

        expect(response.status).toBe(400);
    });
});

