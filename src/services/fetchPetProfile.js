import supabase from './supabaseClient';

async function fetchPetProfile() {
  // TODO 현재 로그인한 유저 아이디를 받아옴, zustand 참고하도록 수정 필요
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user.identities[0].id);
  const user_id = user.identities[0].id;

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
