import { useState } from "react";
import cookieImage from "./img/c.jpg";

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <p>Aktueller Zähler: {count}</p>
            {/* Nur das Bild ist klickbar */}
            <img
                src={cookieImage}
                alt="Cookie"
                style={{ cursor: "pointer" }}
                onClick={handleClick}
                width="100px"
            />
        </div>
    );
};

export default Counter;