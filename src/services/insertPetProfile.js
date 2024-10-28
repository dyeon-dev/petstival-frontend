import supabase from './supabaseClient';

async function insertPetProfile(data) {
  console.table(data);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user.identities[0].id);
  const user_id = user.identities[0].id;

  const { error } = await supabase.from('pet').insert({
    pet_name: data.pet_name,
    know_birth: data.know_birth,
    birth_date: data.birth_date,
    birth_month: data.birth_month,
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
