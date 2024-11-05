import { useState, useEffect } from 'react';
import useDeliveryStore from '../../stores/useDeliveryStore';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Plus from '../../assets/icons/plus_info.svg?react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DeliveryInfo() {
  const [save, setSave] = useState(true);
  const { name, number, address, detailAddress, setName, setNumber, setAddress, setDetailAddress } = useDeliveryStore();
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    detailAddress: '',
  });

  const isFormComplete = name && number && address && detailAddress;

  // 전화번호 형식 검증을 포함한 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {
      name: name ? '' : '이름을 입력해주세요.',
      detailAddress: detailAddress ? '' : '세부주소를 입력해주세요.',
      number: /^010\d{7,8}$/.test(number) ? '' : '전화번호는 010으로 시작하고 10~11자리 숫자로 입력해주세요.',
    };

    setErrors(newErrors);

    return Object.values(newErrors).every((msg) => msg === '');
  };

  const handleInfo = () => {
    if (validateForm()) {
      setSave(false); // 폼을 닫고 배송지 정보만 표시
    }
  };

  const handleEditInfo = () => {
    setSave(true); // 폼을 다시 열기
  };

  const handleAccordionToggle = () => {
    setSave((prevSave) => !prevSave);
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }

        setAddress(`${addr} ${extraAddr}`);
      },
    }).open();
  };

  // 전화번호 입력 핸들러
  const handleNumberChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // 숫자 이외의 문자 제거
    setNumber(input.slice(0, 11)); // 최대 11자리로 제한
  };

  // 초기 로딩 시 번호가 없을 때 기본값을 '010'으로 설정
  useEffect(() => {
    if (!number) {
      setNumber('010');
    }
  }, [number, setNumber]);

  return (
    <>
      <h3>배송지 정보</h3>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '15px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        }}
      >
        {save ? (
          <Accordion
            expanded={save}
            onChange={handleAccordionToggle}
            sx={{ borderRadius: '8px', backgroundColor: 'var(--primary-bright)' }}
          >
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header">
              <Plus />
              <Typography>배송지 정보 추가하기</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                required
                id="outlined-required"
                label="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={Boolean(errors.name)}
                helperText={errors.name}
              />
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                required
                id="outlined-required"
                label="전화번호를 입력해주세요"
                value={number}
                onChange={handleNumberChange} // 숫자만 입력 가능
                error={Boolean(errors.number)}
                helperText={errors.number}
                placeholder="010으로 시작하는 10~11자리 번호 입력"
              />
              <Grid container spacing={1} sx={{ mb: 1 }}>
                <Grid item xs={9}>
                  <TextField
                    fullWidth
                    required
                    id="outlined-read-only-input"
                    label="도로명 주소를 입력해주세요"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button variant="outlined" onClick={handleAddressSearch} sx={{ height: '100%' }}>
                    주소 검색
                  </Button>
                </Grid>
              </Grid>
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                required
                id="outlined-required"
                label="세부주소를 입력해주세요"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                error={Boolean(errors.detailAddress)}
                helperText={errors.detailAddress}
              />
              <Grid sx={{ mt: 2 }}>
                <Button
                  onClick={handleInfo}
                  disabled={!isFormComplete}
                  variant="contained"
                  size="large"
                  sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)' }}
                >
                  확인
                </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
        ) : (
          <>
            <Typography gutterBottom variant="subtitle3" component="div" sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '20px' }}>
              {name}
            </Typography>
            <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px', flexDirection: 'column' }}>
              <Typography variant="body2" component="div">
                {number}
              </Typography>
              <Typography variant="body2" component="div">
                {address} {detailAddress}
              </Typography>
            </Grid>
            <Button variant="outlined" onClick={handleEditInfo} sx={{ mt: 2, width: '100%', borderRadius: '8px' }}>
              배송지 변경하기
            </Button>
          </>
        )}
      </Paper>
    </>
  );
}