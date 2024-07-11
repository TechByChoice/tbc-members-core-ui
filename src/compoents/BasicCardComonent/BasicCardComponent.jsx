import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';

const StyledCard = styled(Card)`
    border-radius: 15px;
    box-shadow: ${({ theme }) => theme.shadows[4]};
    overflow: hidden;
    background-color: #f5f0de;
    width: 100%;
    max-width: 345px;
    margin: auto;
`;

const StyledCardMedia = styled(CardMedia)`
    height: 140px;
`;

const CardHeader = styled(Box)`
    display: flex;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2)};
`;

const CardIcon = styled(Box)`
    margin-right: ${({ theme }) => theme.spacing(1)};
`;

const CardDetails = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(2)};
`;

const HourlyRate = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 0;
    font-size: 12px;
`;

const CardRate = styled(Typography)`
    font-size: 16px;
`;

const StyledButton = styled(Button)`
    border-radius: 20px;
    padding: ${({ theme }) => theme.spacing(1, 2)};
    background-color: #111418;
    color: #fff;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const StyledChip = styled(Chip)`
    margin: ${({ theme }) => theme.spacing(0.5)};
`;

const BasicCardComponent = ({
    imageUrl,
    headerText,
    // icon,
    hourlyRate,
    buttonText,
    bodyText,
    job = null,
    people = null,
    Events = null,
}) => {
    return (
        <StyledCard>
            <StyledCardMedia component="img" alt={`${job?.company_name}'s logo`} height="140" image={imageUrl} title="company logo" />
            <CardContent>
                <CardHeader>
                    {/*<CardIcon>{icon}</CardIcon>*/}
                    <Typography variant="h6">{headerText}</Typography>
                </CardHeader>
                <Typography variant="body2" color="textSecondary" component="p">
                    {bodyText}
                </Typography>
                <CardDetails>
                    <HourlyRate>
                        <Typography variant="subtitle2">Hourly Rate:</Typography>
                        <CardRate>${hourlyRate}</CardRate>
                    </HourlyRate>
                    <StyledButton>{buttonText}</StyledButton>
                </CardDetails>
                <Stack direction="row" spacing={1} mt={2}>
                    {job?.sills?.map((skill, index) => (
                        <StyledChip key={index} label={skill.name} />
                    ))}
                </Stack>
            </CardContent>
        </StyledCard>
    );
};

BasicCardComponent.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    // icon: PropTypes.element.isRequired,
    hourlyRate: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
};

BasicCardComponent.defaultProps = { imageUrl: {} };
export default BasicCardComponent;
