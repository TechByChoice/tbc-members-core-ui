import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatCard = ({ title, value, description }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="h4" component="p">
                    {value}
                </Typography>
                {description && (
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default StatCard;
