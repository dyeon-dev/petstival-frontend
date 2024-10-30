import supabase from './supabaseClient';

async function insertPetProfile(petData) {
  // TODO 현재 세션에서 user id 가져오기, zustand로 수정
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user?.id; // 세션의 uid 가져오기
  console.log(user_id);

  const { data, error } = await supabase.from('pet').insert({
    pet_name: petData.pet_name,
    know_birth: petData.know_birth,
    birth_date: petData.know_birth ? petData.birth_date : null,
    birth_month: petData.know_birth ? Number(petData.birth_year) * 12 + Number(petData.birth_month) : 0,
    breed: petData.breed,
    gender: petData.gender,
    neutered: petData.neutered,
    weight: petData.weight,
    profile_url: petData.profile_img_url,
    user_id: user_id,
  });
  console.log(data);
  if (error) {
    console.log(error);
    throw error;
  }
}

export default insertPetProfile;
