import React, {Suspense, useEffect, useState} from 'react';
import {useAuth} from '@/providers/AuthProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import ProfileCompletionModal from '@/compoents/ProfileCompletionModal';
import {getInProgressReviews} from "@/api-calls";
import {useStatusMessage} from "@/hooks/useStatusMessage";
import InProgressReviewsModal from "@/compoents/InProgressReviewsModal";
import LoadingScreen from './LoadingScreen';

const Review = React.lazy(() => import('open_doors/Review'));
export default function WrapperReview() {
    const {user} = useAuth();
    const user_account = user?.[0]?.account_info;
    const reviewAccess = user_account?.is_company_review_access_active;
    const isMember = user_account?.is_member;
    const od_profile_status = user_account && user_account?.is_open_doors_profile_complete;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewModalStatus, setReviewModalStatus] = useState(false)
    const [inProgress, setInProgress] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const statusMessage = useStatusMessage();

    useEffect(() => {
        if (!od_profile_status && user.length > 0 && !isMember) {
            setIsModalOpen(true);
        }
    }, [od_profile_status]);

    useEffect(() => {
        checkReports()
    }, [user]);

    const checkReports = async () => {
        if (user[0]?.user_info?.id) {
            try {
                const data = await getInProgressReviews(user[0]?.user_info?.id);
                console.log(data.reviews, 'data')
                if (data) {
                    setInProgress(data.reviews)
                    setReviewModalStatus(true)
                }
                setIsLoading(false)
            } catch (error) {
                setIsLoading(false)
                // statusMessage.error('We ran into an issue saving the questions. Please try again.');
                console.error('Error submitting questions:', error);
            }
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ProfileCompletionModal open={isModalOpen} onClose={handleCloseModal}/>
            <InProgressReviewsModal items={inProgress} open={reviewModalStatus}
                                    onClose={() => setReviewModalStatus(false)}/>
            {isLoading && (
                <LoadingScreen/>
            )}
            {reviewAccess ? (
                <>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Review user={user?.[0]?.user_info?.id}/>
                    </Suspense>
                </>
            ) : (
                <Box justifyContent="center" display="flex">
                    <Box display="flex" flexDirection="column" mt={4} gap={3} borderRadius={2} border="1px solid"
                         borderColor="grey.300" maxWidth={500}>
                        <Box>
                            <Typography variant="h6" px={2} pt={2} textAlign="center">
                                <b>Access to Submit Reviews Restricted</b>
                            </Typography>
                        </Box>
                        <Box px={2}>
                            <Typography variant="body1">
                                Your access to submit reviews has been temporarily restricted. This may be because you
                                have reached the maximum number of reviews allowed
                                for the year, or your account has been flagged for unusual activity. If you believe this
                                is an error or have any questions, please contact
                                our support team for assistance.
                            </Typography>
                        </Box>
                        <Box display="flex" flexWrap="wrap" gap={1} px={2} pb={2}>
                            <Box flex="auto">
                                {/*<Button*/}
                                {/*    variant={"outlined"}*/}
                                {/*    size="large"*/}
                                {/*    fullWidth*/}
                                {/*    disableElevation*/}
                                {/*    sx={{borderRadius: "40px"}}*/}
                                {/*>*/}
                                {/*    Request Support*/}
                                {/*</Button>*/}
                            </Box>
                            <Box flex="auto">
                                <Link to="/dashboard">
                                    <Button variant={'contained'} color={'primary'} size="large" fullWidth
                                            disableElevation sx={{borderRadius: '40px'}}>
                                        Go home
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
}
