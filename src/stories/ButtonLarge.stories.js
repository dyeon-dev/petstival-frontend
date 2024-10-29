import ButtonLarge from '../components/Common/Button/ButtonLarge';

export default {
  title: 'ButtonLarge',
  component: ButtonLarge,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  args: {
    disabled: false,
  },
};

// 활성화
export const Default = (args) => <ButtonLarge {...args}>다음</ButtonLarge>;

// 비활성화
export const Disabled = (args) => <ButtonLarge {...args}>다음</ButtonLarge>;

// 기본 args 설정
Default.args = {
  disabled: false,
};

Disabled.args = {
  disabled: true,
};
