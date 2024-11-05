import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import supabase from '../../services/supabaseClient';
import { useLocation } from 'react-router-dom';
const QRCodeAuthPage = () => {
    const location = useLocation();
    const {user} = useAuthStore();
    const params = new URLSearchParams(location.search); // 쿼리 문자열에서 파라미터 가져오기
    const festivalId = params.get("festival_id"); // festival_id 추출

    useEffect(() => {
        console.log(user.id);
        const getFestivalAuth = async () => {
            try {
                const { data, error } = await supabase
                .from('user_festival')
                .select('verified')
                .eq('user_id',user)
                .eq('fetstivals_id',festivalId);
                if (error) {
                    // 오류가 발생한 경우
                    console.error("Error fetching data:", error.message);
                } else if (data.length > 0) {
                    // 조건에 맞는 데이터가 있는 경우
                    const isVerified = data[0].verified; // verifide 값을 가져옴
                    console.log("Verification status:", isVerified); // 콘솔에 출력
                } else {
                    // 조건에 맞는 데이터가 없는 경우
                    console.log("No matching records found.");
                }
            } catch (error) {
                console.error(error);
            }
           
    
        }
        getFestivalAuth(); // 함수 호출
    })
   

    return (
        <div>QR 인증 확인중...</div>
    )
}
export default QRCodeAuthPage;