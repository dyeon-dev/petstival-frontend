import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders } from '../_shared/cors.ts'

const widgetSecretKey = Deno.env.get('WIDGET_SECRET_KEY')

Deno.serve(async (req) => {
  if (req.method === "POST" && req.url === "http://edge-runtime.supabase.com/payment") {
    const { paymentKey, orderId, amount } = await req.json();

    const encryptedSecretKey =
      "Basic " + btoa(widgetSecretKey + ":");
      try {
      const response = await fetch("https://api.tosspayments.com/v1/payments/confirm", {
        method: "POST", // 메서드 추가
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // body에 JSON 문자열로 전달
          orderId: orderId,
          amount: amount,
          paymentKey: paymentKey,
        }),
      });

      // response.json()으로 받아서 비동기 처리를 해줘야 한다.
      const responseBody = await response.json();


      // 결제 성공 비즈니스 로직을 구현하세요.
      return new Response(JSON.stringify(responseBody), {
        status: response.statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error occurred: ", error); // 에러 로그 추가
      // 결제 실패 비즈니스 로직을 구현하세요.
      return new Response(JSON.stringify(error.response.body), {
        status: error.response.statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  return new Response("Method Not Allowed", { status: 405 });
});
