import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  const { "g-recaptcha-response": token } = JSON.parse(event.body);

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, message: "Missing reCAPTCHA token" }),
    };
  }

  const secretKey = process.env.RECAPTCHA_SECRET; // Load secret key from environment variables

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
    method: "POST",
  });

  const verificationResult = await response.json();

  if (verificationResult.success && verificationResult.score > 0.5) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, score: verificationResult.score }),
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "reCAPTCHA verification failed",
        errorCodes: verificationResult["error-codes"],
      }),
    };
  }
}
