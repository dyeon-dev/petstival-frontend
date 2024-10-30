import supabase from './supabaseClient';

async function updatePetProfile(petId, petData) {
  const { data, error } = await supabase
    .from('pet')
    .update({
      pet_name: petData.pet_name,
      know_birth: petData.know_birth,
      birth_date: petData.know_birth ? petData.birth_date : '',
      birth_month: petData.know_birth ? Number(petData.birth_year) * 12 + Number(petData.birth_month) : 0,
      breed: petData.breed,
      gender: petData.gender,
      neutered: petData.neutered,
      weight: petData.weight,
      profile_url: petData.profile_img_url,
      user_id: petData.user_id,
    })
    .eq('pet_id', `${petId}`);

  console.log(data);
  if (error) {
    console.log(error);
    throw error;
  }
}

export default updatePetProfile;
