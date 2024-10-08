import React, {useEffect, useState} from 'react';
import {List, ListItem, OutlinedInput, Paper} from '@mui/material';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import _ from 'lodash';

const mapboxClient = mbxGeocoding({accessToken: import.meta.env.VITE_APP_MAPBOX_ACCESS_TOKEN});

function InputLocation({formErrors, handleAutocompleteChange, fieldName = 'location', defaultValue = null}) {
    const [inputValue, setInputValue] = useState(defaultValue); // Store input value
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        setInputValue(defaultValue);
    }, [defaultValue]);

    // Function to get country code from timezone
    const getCountryFromTimezone = () => {
        try {
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            const country = timeZone.split('/')[0];

            // Map common timezone countries to their ISO 3166-1 alpha-2 country codes
            const countryCodeMap = {
                'America': 'us',
                'Europe': 'gb',
                'Asia': 'in',
                'Australia': 'au',
                'Africa': 'za',
            };

            return countryCodeMap[country] || 'us'; // Default to 'us' if not found
        } catch (error) {
            console.error('Error getting country from timezone:', error);
            return 'us'; // Default to 'us' if there's an error
        }
    };

    // Debounced function to fetch location suggestions
    const fetchSuggestions = _.debounce(async (value) => {
        const userCountry = getCountryFromTimezone();

        if (value.length >= 3) {
            mapboxClient
                .forwardGeocode({
                    query: value,
                    countries: [userCountry],
                    autocomplete: true,
                    limit: 5,
                })
                .send()
                .then(response => {
                    setSuggestions(response.body.features); // Store the entire feature for access to context
                })
                .catch(error => {
                    console.error('Error fetching suggestions:', error);
                });
        } else {
            setSuggestions([]);
        }
    }, 300);

    const handleInputChange = e => {
        const value = e.target.value;
        setInputValue(value);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = feature => {
        const location = {
            city: '',
            state: '',
            postalCode: '',
        };
        location.postalCode = feature.text;
        // Parse feature to fill the location object
        feature.context.forEach(contextItem => {
            if (contextItem.id.startsWith('place')) {
                location.city = contextItem.text;
            } else if (contextItem.id.startsWith('region')) {
                location.state = contextItem.text;
            }
        });

        // Set the input value to the combination or any format you prefer
        setInputValue(`${location.city}, ${location.state} ${location.postalCode}`);
        setSuggestions([]); // Clear suggestions
        handleAutocompleteChange('city', location.city);
        handleAutocompleteChange('state', location.state);
        handleAutocompleteChange('postalCode', location.postalCode);
        handleAutocompleteChange('postal_code', location.postalCode);
        handleAutocompleteChange('location', `${location.city}, ${location.state} ${location.postalCode}`);
    };

    return (
        <>
            <OutlinedInput onChange={handleInputChange} name={fieldName} value={inputValue} autoComplete="off"/>
            {suggestions.length > 0 && (
                <Paper square>
                    <List>
                        {suggestions.map((feature, index) => (
                            <ListItem key={index} button onClick={() => handleSuggestionClick(feature)}>
                                {feature.place_name}
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            )}
        </>
    );
}

export default InputLocation;
