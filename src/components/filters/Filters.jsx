import styled from 'styled-components';
import { FilterInput } from './FilterInput';
import { useCallback, useState } from 'react';
import {
  DEFAULT_FILTERS,
  GENDER_OPTIONS,
  SPECIES_OPTIONS,
  STATUS_OPTIONS
} from './filters.constants';
import { useData } from '../providers';
import { FilterSelect } from './FilterSelect';

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
        <Button onClick={handleApplyFilters}>Apply</Button>
        <Button onClick={handleResetFilters}>Reset</Button>
      </ButtonMenu>
    </FiltersGrid>
  );
};

const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
`;

const ButtonMenu = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  display: block;
  border: 1px solid green;
  background-color: transparent;
  border-radius: 8px;
  color: white;
`;
