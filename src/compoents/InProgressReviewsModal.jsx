import React from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Typography
} from '@mui/material';
import {Link} from 'react-router-dom';
import {formatDateUtil} from "@/utils/helpers";

const InProgressReviewsModal = ({open, onClose, items}) => {
    const renderItems = () => {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return <Typography>No items in progress.</Typography>;
        }

        return (
            <List>
                {items.map((item, index) => (
                    <Link to={`/questions/${item.id}`}>
                        <ListItem key={index}>
                            <ListItemText

                                primary={renderItemPrimary(item)}
                                secondary={renderItemSecondary(item)}
                            />
                        </ListItem>
                    </Link>
                ))}
            </List>
        );
    };

    const renderItemPrimary = (item) => {
        if (item.company_name) {
            return `${item.company_name}`;
        } else if (item.company_id) {
            return `Company ID: ${item.company_id}`;
        } else {
            return 'Unknown Company';
        }
    };

    const renderItemSecondary = (item) => {
        const details = [];
        if (item.review_type) details.push(`Type: ${item.review_type}`);
        if (item.date_started) details.push(`Started: ${new Date(item.date_started).toLocaleDateString()}`);
        if (item.progress) details.push(`Progress: ${item.progress}%`);
        return details.join(' | ');
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Would you like to pick up where you left off?</DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    You have the following item(s) in process. If you would like to pick up where you left off, select
                    an item below.
                </Typography>
                <List>
                    {items &&
                        items.map((item, index) => (
                            <ListItemButton alignItems="flex-start"
                                            component={Link}
                                            to={`/questions/${item.id}`}
                                            onClick={() => console.log(item.id)}
                            >
                                <ListItemText
                                    primary={item.company_name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Started:
                                            </Typography>
                                            { ` ${formatDateUtil(item.created_at)}`}
                                        </React.Fragment>
                                    }
                                />
                            </ListItemButton>
                        ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="error">
                    Create new Report
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default InProgressReviewsModal;
