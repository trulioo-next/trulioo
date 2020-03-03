import React, { useEffect, useState } from "react";
 

const SectionHero = () => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoaded(true);
        }, 0);
    }, []);

    return <div>Hero markup here</div>;
};

SectionHero.defaultProps = {};

export default SectionHero;
