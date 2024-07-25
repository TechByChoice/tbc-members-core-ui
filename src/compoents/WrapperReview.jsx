import React, { Suspense, useEffect, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ProfileCompletionModal from '@/compoents/ProfileCompletionModal';

const Review = React.lazy(() => import('open_doors/Review'));
export default function WrapperReview() {
    const { user } = useAuth();
    const user_account = user?.[0].account_info;
    const reviewAccess = user_account.is_company_review_access_active;
    const od_profile_status = user_account?.is_open_doors_profile_complete;
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    useEffect(() => {
        if (!od_profile_status) {
            setIsModalOpen(true);
        }
    }, [ od_profile_status ]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <ProfileCompletionModal open={isModalOpen} onClose={handleCloseModal} />

            {reviewAccess ? (
                <>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Review user={user?.[0]?.user_info?.id} />
                    </Suspense>
                </>
            ) : (
                <Box justifyContent="center" display="flex">
                    <Box display="flex" flexDirection="column" mt={4} gap={3} borderRadius={2} border="1px solid" borderColor="grey.300" maxWidth={500}>
                        <Box>
                            <Typography variant="h6" px={2} pt={2} textAlign="center">
                                <b>Access to Submit Reviews Restricted</b>
                            </Typography>
                        </Box>
                        <Box px={2}>
                            <Typography variant="body1">
                                Your access to submit reviews has been temporarily restricted. This may be because you have reached the maximum number of reviews allowed
                                for the year, or your account has been flagged for unusual activity. If you believe this is an error or have any questions, please contact
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
                                    <Button variant={'contained'} color={'primary'} size="large" fullWidth disableElevation sx={{ borderRadius: '40px' }}>
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
