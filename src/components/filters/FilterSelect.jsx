import styled from 'styled-components';
import { ChevronUp, ChevronDown, X } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';

export const FilterSelect = ({ name, value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleSelect = useCallback(
    (e) => {
      const option = e.currentTarget.dataset.option;
      onChange({ target: { name, value: option } });
      setIsOpen(false);
    },
    [name, onChange]
  );

  const handleClearValue = useCallback(
    (e) => {
      e.stopPropagation();
      onChange({ target: { name, value: '' } });
    },
    [name, onChange]
  );

  return (
    <SelectContainer ref={selectRef}>
      <SelectTrigger $isOpen={isOpen} $isEmpty={!value} onClick={handleToggle}>
        <DefaultSelectValue>{value || 'Select'}</DefaultSelectValue>

        <SelectIcon>
          {value ? (
            <ClearButton onClick={handleClearValue}>
              <X size={18} strokeWidth={2} />
            </ClearButton>
          ) : isOpen ? (
            <ChevronUp size={18} strokeWidth={2} color="#ffffff" />
          ) : (
            <ChevronDown size={18} strokeWidth={2} color="#b2b2b2" />
          )}
        </SelectIcon>
      </SelectTrigger>

      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Option
              key={option}
              data-option={option}
              $active={option === value}
              onClick={handleSelect}
            >
              {option}
            </Option>
          ))}
        </Dropdown>
      )}
    </SelectContainer>
  );
};

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DefaultSelectValue = styled.span``;

const SelectIcon = styled.div`
  display: flex;
  align-items: center;
`;

const ClearButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f5;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #83bf46;
  }
`;

const SelectTrigger = styled.button`
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-block: 12px;
  padding-inline: 16px 12px;
  font-size: 16px;
  line-height: 1;
  border: 1px solid #83bf46;
  border-radius: 8px;
  background-color: ${({ $isOpen }) => ($isOpen ? '#334466' : '#263750')};
  color: ${({ $isEmpty }) => ($isEmpty ? '#b3b3b3' : '#f5f5f5')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: #334466;
  }
`;

const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  list-style: none;
  z-index: 900;
  max-height: 158px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 0 8px 8px 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1e1e1e;
    border-radius: 3px;

    &:hover {
      background: #334466;
    }
  }
`;

const Option = styled.li`
  padding: 4px 8px;
  font-size: 16px;
  line-height: 1.4;
  color: #1e1e1e;
  font-weight: ${({ $active }) => ($active ? '600' : '400')};
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: rgba(131, 191, 70, 0.2);
  }

  &:first-child {
    padding: 8px 8px 4px;
    border-radius: 8px 8px 0 0;  
  }

  &:last-child {
    padding 4px 8px 8px;
    border-radius: 0 0 8px 8px;
  }
`;
