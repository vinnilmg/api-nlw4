import request  from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
import createConnection from '../database/index';

describe("Surveys", () => {
    //ANTES DE TUDO RODA MIGRATIONS
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    //DEPOIS DE TUDO
    afterAll(async () => {
        const connection = getConnection();
        await connection.query("DELETE FROM surveys");
        await connection.close();
    });

    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
            title: "Title Example",
            description: "Description Example"
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });

    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description Example2"
        });

        const response = await request(app).get("/surveys")
        expect(response.body.length).toBe(2);
    });
});

