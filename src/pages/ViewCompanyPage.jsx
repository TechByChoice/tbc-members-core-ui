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

            setCompanyData(jobResponse.company);
            setCompanyScore(jobResponse.companyReview[0]);
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
        // <Grid container spacing={3}>
        //     <Grid item md={9} xs={12}>
        //         <Card>
        //             <CardContent>
        //                 {/* Heading Section */}
        //                 <Grid container display="flex" direction="row" alignItems="center" spacing={5}>
        //                     <Grid item xs={12} sm={4}>
        //                         <Card>
        //                             <CardMedia
        //                                 component="img"
        //                                 height="140"
        //                                 src={companyData?.logo}
        //                                 alt={`${companyData?.company_name} Logo`}
        //                             />
        //                         </Card>
        //                     </Grid>
        //                 </Grid>
        //                 <Grid container display="flex" direction="row" alignItems="center" spacing={5}>
        //                     {/*Details*/}
        //                     <Grid item xs={12} sm={8}>
        //                         <Grid container spacing={2} display="flex" alignItems="center" direction="row" justifyContent="space-between">
        //                             <Grid item sm={12} md={4}>
        //                                 <Typography variant="h4">{companyData?.job_title}</Typography>
        //                             </Grid>
        //                         </Grid>
        //
        //                         <Grid container spacing={2} display="flex" direction="row" justifyContent="space-between">
        //                             <Grid item>
        //                                 {companyData?.role?.name && (
        //                                     <div>
        //                                         <Chip size="small" variant="outlined" label={companyData?.role?.name} />
        //                                     </div>
        //                                 )}
        //                             </Grid>
        //                             <Grid item>
        //                                 {companyData?.location && (
        //                                     <div>
        //                                         <span>📍</span>
        //                                         {companyData?.location}
        //                                     </div>
        //                                 )}
        //                             </Grid>
        //                             <Grid item>
        //                                 {companyData?.min_compensation?.range && (
        //                                     <div>
        //                                         <span>💰</span>
        //                                         {companyData?.min_compensation?.range} - {companyData?.max_compensation?.range}
        //                                     </div>
        //                                 )}
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
        //                     <Grid item xs={12} sm={4}>
        //                         <Grid container spacing={2} display="flex" direction="row" justifyContent="end" alignContent="end">
        //                             <Hidden smDown>
        //                                 <Grid item>
        //                                     <Typography variant="body1" align="right">
        //                                         Created: {formatDate(companyData?.created_at)}
        //                                     </Typography>
        //                                 </Grid>
        //                             </Hidden>
        //                             <Grid item>
        //                                 <Button variant="contained" href={companyData?.url}>
        //                                     Add Review
        //                                 </Button>
        //                             </Grid>
        //                         </Grid>
        //                     </Grid>
        //                 </Grid>
        //                 <Divider sx={{ m: 2 }} variant="middle" />
        //                 {/* Body Section */}
        //                 <section>
        //                     <Typography variant="body1">{userDetail?.bio}</Typography>
        //                     <Typography variant="body1">{userDetail?.bio}</Typography>
        //                     <Container>
        //                         <div>
        //                             <Typography variant="h5">Job Description:</Typography>
        //                             <HtmlContentRenderer htmlContent={companyData?.external_description} />
        //                         </div>
        //                         <div>
        //                             <Typography variant="h5">Interview Process:</Typography>
        //                             <HtmlContentRenderer htmlContent={companyData?.external_interview_process} />
        //                         </div>
        //                         <div>
        //                             <Typography variant="h5">Skills:</Typography>
        //                             {companyData?.skills && (
        //                                 <>
        //                                     {companyData?.skills.map(skill => {
        //                                         return (
        //                                             <>
        //                                                 <Chip key={skill.name} label={skill?.name} />
        //                                             </>
        //                                         );
        //                                     })}
        //                                 </>
        //                             )}
        //                         </div>
        //                     </Container>
        //                     {companyData?.data?.current_company && (
        //                         <Container>
        //                             <Typography variant="h5">Current Company</Typography>
        //                             <CompanyCard company={companyData?.data?.current_company} />
        //                         </Container>
        //                     )}
        //                 </section>
        //             </CardContent>
        //         </Card>
        //     </Grid>
        // </Grid>
        <Box sx={{ p: 4 }}>
            <CompanyHeader companyProfile={companyData} companyScore={companyScore} companyJobs={companyJobs} />
            {/*<CompanyMission missionHtml={companyData?.mission.html}/>*/}
            {/* Add additional components here */}
        </Box>
    );
}

export default ViewJobPage;
