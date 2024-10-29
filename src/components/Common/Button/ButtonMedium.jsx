import styled from 'styled-components';

const Button = styled.button`
  width: calc((100% - 8px) / 2);
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${({ sub }) => (sub ? '500' : '700')};
  background-color: ${({ sub }) => (sub ? 'var(--primary-light)' : 'var(--primary-default)')};
  color: ${({ sub }) => (sub ? 'var(--gray-100)' : 'var(--white)')};

  &:active {
    background-color: ${({ sub }) => (sub ? 'var(--primary-medium)' : 'var(--primary-darken)')};
  }
`;

function ButtonMedium({ children, sub, onClick }) {
  return (
    <Button onClick={onClick} sub={sub}>
      {children}
    </Button>
  );
}

export default ButtonMedium;
