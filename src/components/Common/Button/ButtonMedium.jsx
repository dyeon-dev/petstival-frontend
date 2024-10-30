import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.button`
  width: calc((100% - 8px) / 2);
  height: 52px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: ${({ $sub }) => ($sub === 'secondary' ? '500' : '700')};
  background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-light)' : 'var(--primary-default)')};
  color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--gray-100)' : 'var(--white)')};

  &:active {
    background-color: ${({ $sub }) => ($sub === 'secondary' ? 'var(--primary-medium)' : 'var(--primary-darken)')};
  }
`;

function ButtonMedium({ children, sub, onClick }) {
  return (
    <Button onClick={onClick} $sub={sub}>
      {children}
    </Button>
  );
}

// PropTypes 정의
ButtonMedium.propTypes = {
  children: PropTypes.string.isRequired,
  sub: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ButtonMedium;
