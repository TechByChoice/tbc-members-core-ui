import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardMedia, Chip, Stack, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import HtmlContentRenderer from '@/compoents/utils/HtmlContentRenderer';
import { formatDateUtil } from '@/utils/helpers';

const StyledCard = styled(Card)`
    border-radius: 15px;
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
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing(0)};
`;

const CardTitle = styled(Box)`
    display: flex;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing(2)};
    padding-bottom: ${({ theme }) => theme.spacing(0)};
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
            <Link to={`/company/${job?.parent_company?.id}`}>
                <StyledCardMedia component="img" alt={`${job?.company_name}'s logo`} height="140" image={imageUrl} title="company logo" />
            </Link>
            <CardContent>
                <CardHeader>
                    <Typography variant="body1">
                        <Link to={`/company/${job?.parent_company?.id}`}>{job?.parent_company?.company_name}</Link>
                    </Typography>{' '}
                    | <Typography variant="body1">{job?.created_at ? formatDateUtil(job?.created_at) : ''}</Typography>
                </CardHeader>
                <CardTitle>
                    <Link to={`/job/${job.id}`}>
                        <Typography pl="0" ml="0" variant="h6">
                            {headerText}
                        </Typography>
                    </Link>
                </CardTitle>
                <Typography variant="body2" color="textSecondary" component="p">
                    <HtmlContentRenderer maxLines={2} htmlContent={job?.external_description || job?.description} />
                </Typography>
                <Stack direction="row" spacing={1} mt={2}>
                    {job?.skills?.slice(0, 3).map((skill, index) => (
                        <StyledChip key={index} label={skill.name} />
                    ))}
                </Stack>
                <CardDetails>
                    <HourlyRate>
                        {job?.max_compensation.range !== 'None' && (
                            <>
                                <Typography variant="subtitle2">Salary:</Typography>
                                <CardRate>
                                    ${job.max_compensation.range} - ${job.min_compensation.range}
                                </CardRate>
                            </>
                        )}
                    </HourlyRate>
                    <Link to={`/job/${job.id}`}>
                        <Button variant="outlined" size="small">
                            {buttonText}
                        </Button>
                    </Link>
                </CardDetails>
            </CardContent>
        </StyledCard>
    );
};

BasicCardComponent.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    headerText: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    hourlyRate: PropTypes.number.isRequired,
    buttonText: PropTypes.string.isRequired,
};

BasicCardComponent.defaultProps = { imageUrl: {} };
export default BasicCardComponent;
