import { sendEmail } from "./emailService";

export function register(user) {
    /* DB에 회원 추가 */
    const message = "회원 가입을 환영합니다!";
    sendEmail(user.email, message);
}
