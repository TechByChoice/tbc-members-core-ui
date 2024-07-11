import React, { useState } from 'react';
import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';

const StyledBox = styled(Box)`
    display: -webkit-box;
    -webkit-line-clamp: ${({ lines }) => lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export default function HtmlContentRenderer({ htmlContent, maxLines }) {
    const [ isExpanded, setIsExpanded ] = useState(false);

    return <StyledBox dangerouslySetInnerHTML={{ __html: htmlContent }} lines={isExpanded ? 'initial' : maxLines} />;
}

HtmlContentRenderer.propTypes = {
    htmlContent: PropTypes.string.isRequired,
    maxLines: PropTypes.number,
};

HtmlContentRenderer.defaultProps = {maxLines: null, // Default to showing all lines
};
