const expect = require("chai").expect;
const UserService = require("../../domain/user.service");

const emsg = require("../../domain/error/messages");
const mockService = require("../../validation/register");

const testData = {
  name: "test",
  email: "test@test.com",
  password: "testing",
  password2: "testing"
};

describe("validate register input tests", () => {
  it("should fail if name is falsey or no values given", async () => {
    const { errors: err1 } = await mockService({
      ...testData,
      name: ""
    });
    const { errors: err2 } = await mockService({
      ...testData,
      name: null
    });
    const { errors: err3 } = await mockService({
      ...testData,
      name: undefined
    });
    const { errors: err4 } = await mockService({});
    expect(err1.name).to.be.equal(emsg.NAME_FIELD_REQUIRED_ERROR);
    expect(err2.name).to.be.equal(emsg.NAME_FIELD_REQUIRED_ERROR);
    expect(err3.name).to.be.equal(emsg.NAME_FIELD_REQUIRED_ERROR);
    expect(err4.name).to.be.equal(emsg.NAME_FIELD_REQUIRED_ERROR);
  });

  it("should fail if email isn't in email format", async () => {
    const { errors: err1 } = await mockService({
      ...testData,
      email: "fake-email@butt"
    });
    const { errors: err2 } = await mockService({
      ...testData,
      email: "fake-email"
    });
    expect(err1.email).to.be.equal(emsg.EMAIL_INVALID_ERROR);
    expect(err2.email).to.be.equal(emsg.EMAIL_INVALID_ERROR);
  });

  it("should fail if password isn't long enough", async () => {
    const { errors } = await mockService({
      ...testData,
      password: "123",
      password2: "123"
    });
    expect(errors.password).to.be.equal(emsg.PASSWORD_LENGTH_ERROR);
  });

  it("should fail if password doesn't match password2", async () => {
      const { errors } = await mockService({
        ...testData,
        password2: "wrongtest"
      });
      expect(errors.password2).to.be.equal(emsg.PASSWORD_MUST_MATCH_ERROR);
  });
});
