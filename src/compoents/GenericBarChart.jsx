import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const GenericBarChart = ({
    title, dataPoints, width = 400, height = 400 
}) => {
    const [ xAxisData, setXAxisData ] = useState([]);
    const [ seriesData, setSeriesData ] = useState([]);

    useEffect(() => {
        if (dataPoints) {
            const labels = dataPoints.map(item => item.name);
            const data = dataPoints.map(item => item.count || item.value);

            setXAxisData(labels);
            setSeriesData([{ data }]);
        }
    }, [ dataPoints ]);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <BarChart xAxis={[{ scaleType: 'band', data: xAxisData }]} series={seriesData} width={width} height={height} />
            </Box>
        </Container>
    );
};

export default GenericBarChart;
