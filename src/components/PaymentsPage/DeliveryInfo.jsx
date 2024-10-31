import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Plus from '../../assets/icons/plus_info.svg?react';
import ButtonMedium from '../../components/Common/Button/ButtonMedium';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};
export default function DeliveryInfo() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [detailAddress, setDetailAddress] = useState(null);

  const handleInfo = () => {
    const postTestData = async () => {
        const dataToPost = {
            name: name,
            number: number,
            address: address,
            detailAddress: detailAddress,
        };
        
        // order table에 정보를 업데이트
        const { data, error } = await supabase.from('order').upsert([dataToPost]);
    
        if (error) {
          console.error('Error posting data:', error);
          return;
        }
    
        console.log('Data posted successfully:', data);
      };
    
  } 

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
        <Button onClick={handleOpen} size="large" sx={{ width: '100%', borderRadius: '8px', backgroundColor: 'var(--primary-light)', color: 'black' }}>
          <Plus />
          배송지 정보 추가하기
        </Button>
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
              배송지 입력하기
            </Typography>

            <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="이름을 입력해주세요" onChange={(e) => setName(e.target.value)} />
            <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="전화번호를 입력해주세요" onChange={(e) => setNumber(e.target.value)} />
            <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="도로명 주소를 입력해주세요" onChange={(e) => setAddress(e.target.value)} />
            <TextField sx={{ mb: 1 }} fullWidth required id="outlined-required" label="세부주소를 입력해주세요" onChange={(e) => setDetailAddress(e.target.value)} />

            <Grid sx={{ mt: 2 }}>
              <ButtonMedium children={'취소'} sub={'secondary'} />
              <ButtonMedium children={'확인'} sub={'primary'} onClick={handleInfo} />
            </Grid>
          </Box>
        </Modal>

        <Typography gutterBottom variant="subtitle3" component="div" sx={{ fontWeight: 'bold', marginLeft: '10px', marginBottom: '20px' }}>
          김다연
        </Typography>
        <Grid item container spacing={2} sx={{ color: 'text.secondary', marginLeft: '10px', flexDirection: 'column' }}>
          <Typography variant="body2" component="div">
            서울시 중구 마른내로 159-4
          </Typography>
          <Typography variant="body2" component="div">
            010-1234-2134
          </Typography>
        </Grid>
      </Paper>
    </>
  );
}
