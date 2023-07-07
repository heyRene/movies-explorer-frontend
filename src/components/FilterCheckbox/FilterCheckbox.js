import React from "react";

import "./FilterCheckbox.css";

const FilterCheckbox = ({handleCheckbox, checked}) => {

  return (
      <div className="filter-checkbox">
        <label className="filter-checkbox__label" htmlFor="switch">
          <input
            className="filter-checkbox__input"
            type="checkbox"
            id="switch"
            onChange={handleCheckbox}
            checked={checked || ''}
          />
          <span className="filter-checkbox__slider"></span>
        </label>
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
  );
};

export default FilterCheckbox;
