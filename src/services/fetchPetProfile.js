import supabase from './supabaseClient';

async function fetchPetProfile() {
  // TODO 현재 세션에서 user id 가져오기, zustand로 수정
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user?.id; // 세션의 uid 가져오기
  console.log(user_id);

  // pet 테이블에서 현재 로그인한 유저의 반려견 정보를 불러옴
  try {
    const { data, error } = await supabase.from('pet').select().eq('user_id', `${user_id}`);

    if (error) {
      console.log(error);
      throw error;
    }
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default fetchPetProfile;
