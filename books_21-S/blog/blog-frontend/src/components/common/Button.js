import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;

const StyledButton = styled.button`
  ${buttonStyle}
`;

/**
 * 이런식으로 styled로 감 감싸서 만든 컴포넌트의 경우에는
 * 임의의 props가 필터링되지 않는다.
 */
const StyledLink = styled(Link)`
  ${buttonStyle}
`;
// a 태그는 boolean 값이 임의 props로 설정되는 것을 허용하지 않는다.

/**
 * button 스타일을 따로 만들어서 직접 button element에 넘겨주는게 아니라
 * Link를 button 처럼 스타일링해서 직접 Link를 사용하는 방식
 */

function Button(props) {
  return props.to ? (
    <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
  ) : (
    <StyledButton {...props} />
  );
}

export default Button;
