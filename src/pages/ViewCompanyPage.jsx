import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Card, CardContent, CardMedia, Chip, CircularProgress, Divider, Grid, Hidden, Typography } from '@mui/material';
import { useParams } from 'react-router';
import { getCompanyDetails, getJobDetails } from '../api-calls';
import Container from '@mui/material/Container';
import CompanyCard from '../compoents/CompanyCard';
import { Link } from 'react-router-dom';
import { useStatus } from '../providers/MsgStatusProvider';
import { useStatusMessage } from '../hooks/useStatusMessage';
import { routes } from '@/lib/routes';
import CompanyHeader from '@/compoents/CompanyHeader';
import CompanyMission from '@/compoents/CompanyMission';
import Box from '@mui/material/Box';

const HtmlContentRenderer = ({ htmlContent }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE'); // Using German locale ('de-DE') to get the date in 'dd.mm.yyyy' format
};

function ViewJobPage({ userDetail, isLoading }) {
    const { id } = useParams();
    /** @type {any} jobData */
    const [ companyData, setCompanyData ] = useState();
    const [ companyScore, setCompanyScore ] = useState();
    const [ companyJobs, setCompanyJobs ] = useState();

    async function fetchData() {
        try {
            const jobResponse = await getCompanyDetails(id);
            const latestReview = jobResponse.companyReview.length - 1;

            setCompanyData(jobResponse.company);
            setCompanyScore(jobResponse.companyReview[latestReview]);
            setCompanyJobs(jobResponse.companyJobs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
        console.log(companyScore);
    }, [ id ]);

    if (isLoading) {
        return (
            <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
                <CircularProgress />
            </Grid>
        );
    }

    return (
        <Box sx={{ p: 4 }}>
            <CompanyHeader companyProfile={companyData} companyScore={companyScore} companyJobs={companyJobs} />
            {/*<CompanyMission missionHtml={companyData?.mission.html}/>*/}
            {/* Add additional components here */}
        </Box>
    );
}

export default ViewJobPage;
