import React from 'react';

export default function HtmlContentRenderer({ htmlContent }) {
    return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
