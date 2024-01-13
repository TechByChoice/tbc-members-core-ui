import React from 'react';

const SlackMessage = ({ elements }, props) => {
    const renderElement = element => {
        switch (element.type) {
            case 'text':
                return <span style={element.style?.bold ? { fontWeight: 'bold' } : {}}>{element.text}</span>;
            case 'emoji':
                return (
                    <span role="img" aria-label={element.name} style={{ fontSize: '1.2em' }}>
                        {element.unicode}
                    </span>
                );
            case 'link':
                return (
                    <a href={element.url} style={element.style?.bold ? { fontWeight: 'bold' } : {}}>
                        {element.text || element.url}
                    </a>
                );
            case 'broadcast':
                return (
                    <span>
                        <strong>@{element.range}</strong>
                    </span>
                );
            default:
                return <span>{element.text}</span>;
        }
    };

    return (
        <div {...props}>
            {elements.map((element, index) => (
                <React.Fragment key={index}>{renderElement(element)}</React.Fragment>
            ))}
        </div>
    );
};

export default SlackMessage;
