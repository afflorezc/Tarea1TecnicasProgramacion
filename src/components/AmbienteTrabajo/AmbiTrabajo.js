import React, { useState } from "react";
import Oficina from "./Oficina";
import Teletrabajo from "./Teletrabajo";

const AmbiTrabajo = () => {
    const [amTrabajo, setAmTrabajo] = useState("office");
    const [total, setTotal] = useState(0);

    const handleAmTrabajo = (event) => {
        setAmTrabajo(event.target.value);
    };

    const updateTotal = (newTotal) => {
        setTotal(newTotal);
    };

    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="office"
                    checked={amTrabajo === "office"}
                    onChange={handleAmTrabajo}
                />
                Oficina
            </label>
            <label>
                <input
                    type="radio"
                    value="telework"
                    checked={amTrabajo === "telework"}
                    onChange={handleAmTrabajo}
                />
                Teletrabajo
            </label>

            {amTrabajo === 'office' && <Oficina updateTotal={updateTotal} />}
            {amTrabajo === "telework" && <Teletrabajo updateTotal={updateTotal} />}
        </div>
    );
};

export default AmbiTrabajo;
