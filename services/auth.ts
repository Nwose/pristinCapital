import { send } from "./base";

export async function register(
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
) {
  const url = "users/register/";
  return await send("POST", url, {
    email: email,
    password: password,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  });
}

export async function sendEmailOTP(email: string) {
  const url = "users/send_email_verification_otp/";
  return await send("POST", url, { email: email });
}

export async function sendPhoneOTP(phoneNumber: string) {
  const url = "users/send_phone_verification_otp/";
  return await send("POST", url, {
    phone_number: phoneNumber,
  });
}

export async function send2FA_OTP(tfa_token: string) {
  const url = "users/send_2fa_otp/";
  return await send("POST", url, {
    tfa_token: tfa_token,
  });
}

export async function verifyEmailOTP(email: string, otp: string) {
  const url = "users/check_email_verification_otp/";
  return await send("POST", url, {
    email: email,
    otp: otp,
  });
}

export async function verifyPhoneOTP(phoneNumber: string, otp: string) {
  const url = "users/check_phone_verification_otp/";
  return await send("POST", url, {
    phone_number: phoneNumber,
    otp: otp,
  });
}

export async function verify2FA_OTP(tfa_token: string, otp: string) {
  const url = "users/check_2fa_otp/";
  return await send("POST", url, {
    tfa_token: tfa_token,
    otp: otp,
  });
}

export async function loginFirstFactor(email: string, password: string) {
  const url = "login/token/1stfactor/";
  return await send("POST", url, {
    email: email,
    password: password,
  });
}

export async function loginSecondFactor(tfa_token: string, otp: string) {
  const url = "login/token/2ndfactor/";
  return await send("POST", url, {
    tfa_token: tfa_token,
    otp: otp,
  });
}
