import styled from '@emotion/styled';

export const Label = styled.label`
  display: block;
`;
export const Input = styled.input`
  display: block;
  margin-top: 8px;
`;
export const DeleteBtn = styled.button`
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  background-color: #fff;
  padding: 8px 16px;
  &:active {
    background-color: blue;
    color: white;
  }
`;
