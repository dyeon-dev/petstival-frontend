import { useEffect, useState } from 'react';
import useDeliveryStore from '../../stores/useDeliveryStore';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Plus from '../../assets/icons/plus_info.svg?react';
import ButtonMedium from '../../components/Common/Button/ButtonMedium';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DeliveryInfo() {
  const [save, setSave] = useState(true);
  const { name, number, address, detailAddress, setName, setNumber, setAddress, setDetailAddress } = useDeliveryStore();

  // 모든 필드가 채워졌는지 확인
  const isFormComplete = name && number && address && detailAddress;

  const handleInfo = () => {
    setSave(false);
  };

  return (
    <>
      <h3>배송지 정보</h3>
      <Paper
        sx={(theme) => ({
          p: 2,
          margin: 'auto',
          marginBottom: '15px',
          marginTop: '15px',
          maxWidth: 600,
          flexGrow: 1,
          backgroundColor: '#fff',
          boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
        })}
      >
        {save ? (
          <Accordion sx={{ borderRadius: '8px', backgroundColor: 'var(--primary-bright)' }}>
            <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="panel2-content" id="panel2-header">
              <Plus />
              <Typography>배송지 정보 추가하기</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="이름을 입력해주세요" onChange={(e) => setName(e.target.value)} />
              <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="전화번호를 입력해주세요" onChange={(e) => setNumber(e.target.value)} />
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                required
                id="outlined-required"
                label="도로명 주소를 입력해주세요"
                onChange={(e) => setAddress(e.target.value)}
              />
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                required
                id="outlined-required"
                label="세부주소를 입력해주세요"
                onChange={(e) => setDetailAddress(e.target.value)}
              />

              <Grid sx={{ mt: 2 }}>
              <Button onClick={handleInfo} disabled={!isFormComplete} variant="contained" size="large" sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-default)' }}>
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
          </>
        )}
      </Paper>
    </>
  );
}
