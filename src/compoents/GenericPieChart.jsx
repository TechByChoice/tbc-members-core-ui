import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const GenericPieChart = ({ title, dataPoints }) => {
    const [ chartData, setChartData ] = useState([]);

    useEffect(() => {
        if (dataPoints) {
            const formattedData = dataPoints.map((item, index) => ({
                id: index,
                value: item.count || item.value,
                label: item.name,
            }));
            setChartData(formattedData);
        }
    }, [ dataPoints ]);

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    {title}
                </Typography>
                <PieChart series={[{ data: chartData }]} width={400} height={400} />
            </Box>
        </Container>
    );
};

export default GenericPieChart;
