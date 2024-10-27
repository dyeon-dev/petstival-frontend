import supabase from './supabaseClient';

// Storage에 이미지 파일을 업로드하고 URL을 return
async function uploadProfileImg(file) {
  const { sessionData } = await supabase.auth.getSession();
  console.log(sessionData);

  // 사진 파일을 Supabase Storage에 업로드
  const { data, error } = await supabase.storage.from('test').upload('test_01.png', file, { upsert: true });
  if (error) {
    // 업로드에 실패한 경우 실패 alert
    console.log(error);
    window.alert('사진 업로드에 실패했어요. 다시 시도해주세요.');
    return '';
  } else {
    // 업로드에 성공한 경우 Storage publicUrl을 반환
    const urlResponse = supabase.storage.from('test').getPublicUrl('test_01.png');
    const profileImgUrl = urlResponse.data.publicUrl;
    return profileImgUrl;
  }
}

export default uploadProfileImg;
