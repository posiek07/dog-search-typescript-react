import React, { LegacyRef } from 'react';

interface SelectBoxProps {
  values: string[];
  labelText: string;
  name: string;
  register: LegacyRef<HTMLSelectElement> | undefined;
  error: any;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  values,
  labelText,
  name,
  register,
  error
}) => {
  return (
    <div className="col-md-3 col-12 form-group mb-2">
      <label htmlFor={name} className="label">{`${labelText}:`}</label>
      <select
        id={name}
        name={name}
        ref={register}
        className={`custom-select ${error && 'is-invalid'}`}
        aria-label={name}
      >
        <option key={name} value="">
          Select {name}:
        </option>
        {values.map((value, index) => (
          <option key={`${name}${index}`} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
