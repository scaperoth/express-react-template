const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;
const should = chai.should();

const UserService = require("../../domain/user.service");

const errmsg = require("../../domain/error/messages");
const mockService = new UserService({
  findUserByEmail: () => {},
  createUser: data => data
});

const mockUser = {
  name: "test",
  email: "test@test.com",
  password: "testing",
  password2: "testing"
};

beforeEach(done => {
  mockService.findUserByEmail = () => {};
  mockService.createUser = data => data;
  done();
});

describe("user service tests", () => {
  describe("registration tests", () => {
    it("should fail for validation errors", async () => {
      const response = mockService.registerUser({});
      return response.should.be.rejectedWith(errmsg.USER_NOT_VALID_ERROR);
    });

    it("should hash password", async () => {
      const response = await mockService.registerUser({ ...mockUser });
      const { password } = response;
      expect(password).to.not.be.equal(mockUser.password);
      expect(password.length).to.be.equal(60);
    });
  });

  describe("login tests", () => {
    it("should fail for validation errors", async () => {
      const response = mockService.loginUser({});
      response.should.be.rejectedWith(errmsg.INVALID_LOGIN_ERROR);
    });

    it("should fail if user not found", async () => {
      const response = mockService.loginUser({ ...mockUser });
      response.catch(err =>
        err.email.should.be.equal(errmsg.INVALID_EMAIL_ERROR)
      );
      return response.should.be.rejected;
    });

    it("should fail if password doesn't match", async () => {
      mockService.findUserByEmail = () => ({ ...mockUser });
      mockService.bcrypt = {
        compare: () => false
      };
      const response = mockService.loginUser({
        ...mockUser
      });
      response.catch(err =>
        err.password.should.be.equal(errmsg.INVALID_PASSWORD_ERROR)
      );
      return response.should.be.rejected;
    });

    it("should log in if passwords match", async () => {
      mockService.findUserByEmail = () => ({ ...mockUser });
      mockService.bcrypt = {
        compare: () => true
      };
      const response = await mockService.loginUser({
        ...mockUser
      });
      response.success.should.be.equal(true);
    });
  });
});
