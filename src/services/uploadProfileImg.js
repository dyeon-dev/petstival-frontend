import supabase from './supabaseClient';
import { v4 as uuidv4 } from 'uuid'; // uuid를 import 문으로 가져옵니다.

// Storage에 이미지 파일을 업로드하고 URL을 return
async function uploadProfileImg(file) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user_id = session?.user?.id; // 세션의 uid 가져오기
  console.log(user_id);

  // 사진 URL에 들어갈 uuid 생성
  const uuid = uuidv4();

  // 사진 파일을 Supabase Storage에 업로드
  const { data, error } = await supabase.storage.from('pet-profile-img').upload(`${user_id}/${uuid}`, file, { cacheControl: '3600', upsert: true });
  if (error) {
    // 업로드에 실패한 경우 실패 alert
    console.log(error);
    window.alert('사진 업로드에 실패했어요. 다시 시도해주세요.');
    return '';
  } else {
    // 업로드에 성공한 경우 Storage publicUrl을 반환
    console.log(data);
    const urlResponse = supabase.storage.from('pet-profile-img').getPublicUrl(`${user_id}/${uuid}`);
    const profileImgUrl = urlResponse.data.publicUrl;
    console.log(profileImgUrl);
    return profileImgUrl;
  }
}

export default uploadProfileImg;
