import styled from 'styled-components';

export const FilterSelect = ({ name, value, onChange, options }) => {
  return (
    <Select name={name} value={value} onChange={onChange}>
      <Option value="" disabled hidden>
        Select
      </Option>
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

const Select = styled.select``;

const Option = styled.option``;
