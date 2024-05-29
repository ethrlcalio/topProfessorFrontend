import React, {createContext, useState} from 'react';

export const MetricContext = createContext();

const MetricProvider = ({children}) => {
    const [metrics, setMetrics] = useState([
        "Teaching Proficiency",
        "Availability & Responsiveness",
        "Attendance"
    ]);
    return <MetricContext.Provider value={{metrics, setMetrics}}>
        {children}
    </MetricContext.Provider>
}

export default MetricProvider;