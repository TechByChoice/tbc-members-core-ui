import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import {getChannels, postSlackQuestions} from "@/api-calls";
import TipTapEditor from "@/compoents/TipTapEditor";
import {useNavigate} from "react-router";
import {useStatusMessage} from '@/hooks/useStatusMessage';

const SlackQuestionsPage = () => {
    const [channels, setChannels] = useState([]);
    const [channelQuestions, setChannelQuestions] = useState({});
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const statusMessage = useStatusMessage();

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const data = await getChannels();
            setChannels(data);
            // Initialize channelQuestions state
            const initialChannelQuestions = data.reduce((acc, channel) => {
                acc[channel.id] = {
                    question_text: '',
                    is_interest: true,
                    channel: channel.id
                };
                return acc;
            }, {});
            setChannelQuestions(initialChannelQuestions);
        } catch (error) {
            console.error('Error fetching channels:', error);
            statusMessage.error('Failed to fetch channels. Please try again.');
        }
    };

    const handleQuestionChange = (channelId, value) => {
        setChannelQuestions(prev => ({
            ...prev,
            [channelId]: {
                ...prev[channelId],
                question_text: value
            }
        }));
        // Clear error for this channel if it exists
        if (errors[channelId]) {
            setErrors(prev => {
                const newErrors = {...prev};
                delete newErrors[channelId];
                return newErrors;
            });
        }
    };

    const validateChannelQuestions = () => {
        const newErrors = {};
        channels.forEach(channel => {
            if (!channelQuestions[channel.id] || !channelQuestions[channel.id].question_text) {
                newErrors[channel.id] = "Question text is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitAll = async () => {
        if (validateChannelQuestions()) {
            try {

                const data = await postSlackQuestions(channelQuestions);
                setChannelQuestions({});
                statusMessage.success('Saved the set of questions!');
                navigate('/admin/slack/learn');
            } catch (error) {
                statusMessage.error('We ran into an issue saving the questions. Please try again.');
                console.error('Error submitting questions:', error);
            }
        } else {
            statusMessage.error('Please fill in all questions before submitting.');
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Slack Channels and Questions
            </Typography>
            {/*{channels && channels?.map((channel) => (*/}
            {/*    <>*/}
            {/*        {channel.channel_name}*/}
            {/*        <br/>*/}
            {/*    </>*/}
            {/*))}*/}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAll}
            >
                Add All Questions
            </Button>
            {channels.map((channel) => (
                <Box key={channel.id} mb={2}>
                    <Typography variant="h6">#{channel.channel_name}</Typography>
                    <TipTapEditor
                        onFormDataChange={false}
                        onFormDataChangeUpdate={(value) => handleQuestionChange(channel.id, value)}
                        id={channel.id}
                        error={errors[channel.id]}
                        value={channelQuestions[channel.id]?.question_text}
                    />
                    {errors[channel.id] && (
                        <Typography color="error">{errors[channel.id]}</Typography>
                    )}
                </Box>

            ))}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitAll}
            >
                Add All Questions
            </Button>
        </Box>
    );
};

export default SlackQuestionsPage;
