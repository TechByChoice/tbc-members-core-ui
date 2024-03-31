import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme: { breakpoints, spacing } }) => ({
    // width: 360,
    maxWidth: '100%',

    // 16px
    borderRadius: spacing(2),

    transition: '0.3s',
    // boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
    position: 'relative',
    overflow: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingLeft: 8,
    paddingRight: 8,

    // background: "#C91616",

    [breakpoints.up('sm')]: {
        textAlign: 'left',
        flexDirection: 'row-reverse',
    },
}));

const CardMediaMedia = styled(CardMedia)(({ theme: { breakpoints } }) => ({
    flexShrink: 0,
    width: '30%',
    paddingTop: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',

    [breakpoints.up('sm')]: {marginRight: 'initial',},
}));

const TypographyOverline = styled(Typography)(({}) => ({
    lineHeight: 2,
    // color: "#ffffff",
    fontWeight: 'bold',
    fontSize: '0.625rem',
    opacity: 0.7,
}));

const TypographyHeading = styled(Typography)(({}) => ({
    fontWeight: 900,
    // color: "#ffffff",
    letterSpacing: 0.5,
}));

export function FeatureCard({
    title, subTitle, btnText, linkEndpoint, image 
}) {
    return (
        <StyledCard>
            {/*import WorkIcon from '@mui/icons-material/Work';*/}
            <CardMediaMedia image={image} />
            <CardContent>
                <TypographyOverline variant={'overline'}>{subTitle}</TypographyOverline>
                <TypographyHeading variant={'h6'} gutterBottom>
                    {title}
                </TypographyHeading>
                <Link to={linkEndpoint}>
                    <Button variant="outlined">{btnText}</Button>
                </Link>
            </CardContent>
        </StyledCard>
    );
}
