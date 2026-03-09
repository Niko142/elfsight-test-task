import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { BUTTON_VARIANTS } from './constants/button.variants';
import {
  DEFAULT_FILTERS,
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from './constants/filters.constants';
import { FilterInput } from './FilterInput';
import { FilterSelect } from './FilterSelect';
import { useData } from '../providers';

export const Filters = () => {
  const { applyFilters, resetFilters } = useData();

  const [localFilters, setLocalFilters] = useState(DEFAULT_FILTERS);

  // Универсальный обработчик для всех полей фильтрации
  const handleFilterChange = useCallback((e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Обработчик отправки данных для фильтрации API
  const handleApplyFilters = useCallback(() => {
    applyFilters(localFilters);
  }, [applyFilters, localFilters]);

  // Очистить используемые фильтры
  const handleResetFilters = useCallback(() => {
    setLocalFilters(DEFAULT_FILTERS);
    resetFilters();
  }, [resetFilters]);

  return (
    <FiltersGrid>
      <FilterSelect
        name="status"
        value={localFilters.status}
        options={STATUS_OPTIONS}
        onChange={handleFilterChange}
      />
      <FilterSelect
        name="gender"
        value={localFilters.gender}
        options={GENDER_OPTIONS}
        onChange={handleFilterChange}
      />
      <FilterSelect
        name="species"
        value={localFilters.species}
        options={SPECIES_OPTIONS}
        onChange={handleFilterChange}
      />

      <FilterInput
        name="name"
        placeholder="Name"
        value={localFilters.name}
        onChange={handleFilterChange}
      />
      <FilterInput
        name="type"
        placeholder="Type"
        value={localFilters.type}
        onChange={handleFilterChange}
      />

      <ButtonMenu>
        <Button $variant="apply" onClick={handleApplyFilters}>
          Apply
        </Button>
        <Button $variant="reset" onClick={handleResetFilters}>
          Reset
        </Button>
      </ButtonMenu>
    </FiltersGrid>
  );
};

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 180px);
  grid-template-rows: repeat(2, 40px);
  gap: 10px;

  @media (max-width: 930px) {
    grid-template-columns: repeat(3, 150px);
    gap: 15px;
  }

  @media (max-width: 530px) {
    grid-template-columns: 240px;
    grid-template-rows: 40px;
  }
`;

const ButtonMenu = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  font-size: 16px;
  line-height: 1;
  background-color: transparent;
  border: 1px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

  ${({ $variant }) => BUTTON_VARIANTS[$variant]}
`;
