// src/components/QrScanner.jsx
import React, { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QrScanner = () => {
    const qrCodeRef = useRef(null); // QR 코드 스캐너를 렌더링할 DOM 요소에 대한 참조

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("qr-reader"); // QR 코드 스캐너 인스턴스 생성

        const config = {
            fps: 10, // 초당 프레임 수
            qrbox: { width: 250, height: 250 }, // QR 코드 영역 크기
        };

        // QR 코드 스캔 시작
        html5QrCode.start(
            { facingMode: "environment" }, // 카메라 방향
            config,
            (decodedText, decodedResult) => {
                console.log(`QR Code detected: ${decodedText}`); // QR 코드 인식 결과
                // URL 이동 등의 작업 수행
                window.location.href = decodedText; // QR 코드에 포함된 URL로 이동
            },
            (errorMessage) => {
                // QR 코드 인식 실패 시 호출되는 콜백
                console.log(`QR Code scan error: ${errorMessage}`);
            }
        ).catch(err => {
            console.error(`Error starting QR Code scanner: ${err}`);
        });

        // 컴포넌트 언마운트 시 QR 코드 스캔 중지
        return () => {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(err => {
                console.error(`Error stopping QR Code scanner: ${err}`);
            });
        };
    }, []);

    return (
        <div>
            <h2>QR 코드 스캐너</h2>
            <div id="qr-reader" ref={qrCodeRef} style={{ width: "100%" }}></div> {/* QR 코드 스캐너 표시 */}
        </div>
    );
};

export default QrScanner;
