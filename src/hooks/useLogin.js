import supabase from '../service/supabaseClient';

/**
 * 소셜 로그인 함수
 * @param {string} provider - 소셜 로그인 공급자 (google, facebook, kakao 등)
 * @returns {Promise<void>}
 */
export const signInWithProvider = async (provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
        redirect: 'http://localhost:5173/home',
      },
    },
  });

  if (error) {
    console.error('로그인 오류:', error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }

  console.log('로그인 성공:', data);
  console.log(supabase.auth.getSession);
};
