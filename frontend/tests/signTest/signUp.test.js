import { sendEmail } from "./emailService";
import { register } from "./signUpService";

jest.mock("./emailService");

beforeEach(() => {
    sendEmail.mockClear();
});

const user = {
    email: "test@email.com",
};

test("register sends messeges", () => {
    register(user);
  
    expect(sendEmail).toBeCalledTimes(1);
    expect(sendEmail).toBeCalledWith(user.email, "회원 가입을 환영합니다!");
  });