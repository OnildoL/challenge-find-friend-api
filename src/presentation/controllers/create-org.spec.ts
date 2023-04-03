import { app } from "@/main/configs/app";
import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create Org (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a org", async () => {
    const response = await request(app.server).post("/orgs").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      cep: "00000000",
      address: "Rua do John Doe, 152",
      phone: "83900000000",
      password: "123456",
    });

    expect(response.statusCode).toEqual(201);
  });
});
