import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid } from '@mui/material';
import { useParams } from 'react-router';
import { getCompanyDetails } from '@/api-calls';
import CompanyHeader from '@/compoents/CompanyHeader';
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
            setCompanyScore(jobResponse.companyReview[0]);
            setCompanyJobs(jobResponse.companyJobs);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
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
            <CompanyHeader companyId={id} companyProfile={companyData} companyScore={companyScore} companyJobs={companyJobs} isLoading={undefined} error={undefined} />
        </Box>
    );
}

export default ViewJobPage;
