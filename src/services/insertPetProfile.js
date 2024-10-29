import supabase from './supabaseClient';

async function insertPetProfile(data) {
  // TODO 현재 세션에서 user id 가져오기, zustand로 수정
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user?.id; // 세션의 uid 가져오기
  console.log(user_id);

  const { error } = await supabase.from('pet').insert({
    pet_name: data.pet_name,
    know_birth: data.know_birth,
    birth_date: data.know_birth ? data.birth_date : null,
    birth_month: !data.know_birth ? data.birth_month : 0,
    breed: data.breed,
    gender: data.gender,
    neutered: data.neutered,
    weight: data.weight,
    profile_url: data.profile_img_url,
    user_id: user_id,
  });

  if (error) {
    throw error;
  }
}

export default insertPetProfile;
