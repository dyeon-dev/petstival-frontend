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
export const Primary = (args) => <ButtonMedium {...args}>장바구니 담기</ButtonMedium>;

// Secondary (sub button)
export const Secondary = (args) => (
  <ButtonMedium {...args} sub={true}>
    장바구니 담기
  </ButtonMedium>
);

// 기본 args 설정
Primary.args = {
  sub: false,
};

Secondary.args = {
  sub: true,
};
