import React, { useState } from "react";
import "./Salary.css";

const Salary = () => {
  const [salaryPerHour, setSalaryPerHour] = useState(0);
  const data = {
    name: "Juan",
    salary: 285000,
    hours: 4,
  };

  const handleCalculateSalary = (salary, hours) => {
    const salaryPerHour = salary / hours;
    setSalaryPerHour(salaryPerHour);
  };
  return (
    <div className="salary">
      <p className="salary__value">{`$${salaryPerHour}/h`}</p>
      <button
        className="salary__button"
        onClick={() => handleCalculateSalary(data.salary, data.hours)}
      >
        Calcular salario por hora
      </button>
    </div>
  );
};

export default Salary;
