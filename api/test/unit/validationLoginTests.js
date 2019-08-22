const expect = require("chai").expect;
const emsg = require("../../domain/error/messages");
const mockService = require("../../validation/login");

const testData = {
  email: "test@test.com",
  password: "testing"
};

describe("validate login input tests", () => {
  it("should fail if email is falsey or no values given", async () => {
    const { errors: err1 } = await mockService({
      ...testData,
      email: ""
    });
    const { errors: err2 } = await mockService({
      ...testData,
      email: null
    });
    const { errors: err3 } = await mockService({
      ...testData,
      email: undefined
    });
    const { errors: err4 } = await mockService({});

    expect(err1.email).to.be.equal(emsg.EMAIL_FIELD_REQUIRED_ERROR);
    expect(err2.email).to.be.equal(emsg.EMAIL_FIELD_REQUIRED_ERROR);
    expect(err3.email).to.be.equal(emsg.EMAIL_FIELD_REQUIRED_ERROR);
    expect(err4.email).to.be.equal(emsg.EMAIL_FIELD_REQUIRED_ERROR);
  });

  it("should fail if email isn't in email format", async () => {
    const { errors: err1 } = await mockService({
      ...testData,
      email: "fake-email@fake"
    });
    const { errors: err2 } = await mockService({
      ...testData,
      email: "fake-email"
    });
    expect(err1.email).to.be.equal(emsg.EMAIL_INVALID_ERROR);
    expect(err2.email).to.be.equal(emsg.EMAIL_INVALID_ERROR);
  });

  it("should fail if password not provided", async () => {
    const { errors } = await mockService({
      ...testData,
      password: ""
    });
    expect(errors.password).to.be.equal(emsg.PASSWORD_REQUIRED_ERROR);
  });
});
