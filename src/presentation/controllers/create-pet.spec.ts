import { app } from "@/main/configs/app";
import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Pet (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a pet", async () => {
    await request(app.server).post("/orgs").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: "123456",
    });

    const { body } = await request(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const response = await request(app.server)
      .post("/pets")
      .send({
        org_id: body.org.id,
        name: "Alfredo",
        age: "Filhote",
        description:
          "Eu sou um lindo doguinho de 3 anos, um jovem bricalhão que adora fazer companhia, uma bagunça mas também ama uma soneca.",
        energy_level: 4,
        size: "Pequenino",
        level_independence: "Médio",
        type: "Cachorro",
        breed: "Bulldog",
        environment: "Ambiente amplo",
        city: "Recife",
        uf: "PE",
        requirements: [
          "Local grande para o animal correr e brincar.",
          "Proibido apartamento.",
          "Ambiente frio, pois possui muito pelo.",
          "Cão com intolerância a lactose.",
        ],
      });

    expect(response.statusCode).toEqual(201);
  });
});
