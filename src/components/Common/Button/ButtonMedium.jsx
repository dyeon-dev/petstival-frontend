import styled from 'styled-components';

const Button = styled.button`
  width: calc(100%);
  max-width: 222px;
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${({ sub }) => (sub ? '500' : '700')};
  background-color: ${({ sub }) => (sub ? 'var(--primary-light)' : 'var(--primary-default)')};
  color: ${({ sub }) => (sub === 'primary' ? 'var(--gray-100)' : 'var(--white)')};

  &:active {
    background-color: ${({ sub }) => (sub ? 'var(--primary-medium)' : 'var(--primary-darken)')};
    background-color: var(--primary-darken);
  }
`;

function ButtonMedium({ children, sub, onClick }) {
  return (
    <ButtonMedium onClick={onClick} disabled={disabled} sub={sub}>
      {children}
    </ButtonMedium>
  );
}

export default ButtonMedium;
