import styled from 'styled-components';

export const FilterInput = ({ name, placeholder, value, onChange }) => {
  return (
    <Input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

const Input = styled.input`
  padding: 12px 16px;
  font-size: 16px;
  line-height: 1;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: #263750;
  color: #f5f5f5;
  outline: none;
  transition: background-color 0.2s ease-in-out;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:hover,
  &:focus {
    background-color: #334466;
  }
`;
