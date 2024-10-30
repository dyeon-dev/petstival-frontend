import ButtonMedium from '../components/Common/Button/ButtonMedium';

export default {
  title: 'ButtonMeduim',
  component: ButtonMedium,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    sub: false,
  },
};

// Primary
export const Primary = { args: { sub: false } };

// Secondary (sub button)
export const Secondary = { args: { sub: true } };

// 피그마로 컴포넌트 디자인 확인하기
DetailTitle.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/design/G14CLP8aTlOvMhZPhx4Ggt/PETSTIVAL-UI?node-id=4002-1718&t=CSIA7CP1ivnhak4W-1',
  },
};
