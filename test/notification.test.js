import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";

describe("POST /notification", () => {
  it("should send an email successfully with valid data", (done) => {
    const emailSent = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
      message: "Hello from the contact form!",
    };
    request(app)
      .post("/notification")
      .send(emailSent)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("✅ Email sent successfully.");
        done();
      });
  });

  it("should return 400 if something is missing", (done) => {
    const emailSent = {};

    request(app)
      .post("/notification")
      .send({ emailSent }) // only email, missing password
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal(
          "❌ First name, last name, email, phone, and message are required."
        );
        done();
      });
  });
});
