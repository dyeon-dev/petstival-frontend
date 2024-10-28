// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { corsHeaders } from '../_shared/cors.ts';  // CORS 설정 파일에서 CORS 헤더 불러오기

console.log("Hello World function with CORS running!");

serve((_req) => {
  const data = { message: "Hello from Supabase Edge Functions with CORS!" };

  // 응답에 CORS 헤더를 포함하여 반환
  return new Response(
    JSON.stringify(data),  // 응답 데이터를 JSON 형식으로 변환하여 반환
    {
      headers: {
        ...corsHeaders,  // 불러온 CORS 헤더 추가
        "Content-Type": "application/json",  // 응답의 Content-Type 설정
      },
    },
  );
});