import supabase from './supabaseClient';

// Storage에 이미지 파일을 업로드하고 URL을 return
async function uploadProfileImg(file, url) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user.identities[0].id);
  const user_id = user.identities[0].id;

  // 사진 파일을 Supabase Storage에 업로드
  const { data, error } = await supabase.storage.from('pet-profile-img').upload(`${user_id}/${url}`, file, { cacheControl: '3600', upsert: true });
  if (error) {
    // 업로드에 실패한 경우 실패 alert
    console.log(error);
    window.alert('사진 업로드에 실패했어요. 다시 시도해주세요.');
    return '';
  } else {
    // 업로드에 성공한 경우 Storage publicUrl을 반환
    console.log(data);
    const urlResponse = supabase.storage.from('pet-profile-img').getPublicUrl(`${user_id}/${url}`);
    const profileImgUrl = urlResponse.data.publicUrl;
    console.log(profileImgUrl);
    return profileImgUrl;
  }
}

export default uploadProfileImg;
