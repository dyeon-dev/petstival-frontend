import * as React from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Chip from '@mui/material/Chip';

const Wrapper = styled.section`
  margin-left: 24px;
  margin-right: 24px;
`;

export default function PetstivalListPage() {
  return (
    <div className="no-height">
      <Header />
      <Wrapper>
        <ImageList cols={1}>
          {itemData.map((item) => (
            <Paper
              sx={(theme) => ({
                p: 2,
                marginBottom: '15px',
                flexGrow: 1,
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0px 0px 8px 0px rgba(51, 51, 51, 0.08)',
              })}
            >
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
                
                <ImageListItemBar
                  title={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h6" sx={{ marginRight: '8px' }}>{item.title}</Typography>
                      <Chip label="진행중" color="primary" variant="outlined" />
                    </div>
                  }
                  subtitle={<Typography sx={{ marginTop: '4px' }}>{item.date}</Typography>}
                  position="below"
                />
              </ImageListItem>
            </Paper>
          ))}
        </ImageList>
      </Wrapper>
      <Navbar selectedMenu="MyPage" />
    </div>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    date: '2023.10.10 - 2023.10.13',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    date: '2023.10.10 - 2023.10.13',
  },
];
