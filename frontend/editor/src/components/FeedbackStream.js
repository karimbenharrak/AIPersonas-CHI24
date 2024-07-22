import React, { useState, useRef, useEffect, useContext } from 'react';
import { Card, CardContent } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import $ from 'jquery';
// studyAlign
import {LoggerEvents} from "../logger/logger";
import {LoggerContext} from "../App";

//const BACKEND_URL = "https://btn6xd.inf.uni-bayreuth.de/persona-api/";
const BACKEND_URL = "http://127.0.0.1:5000/";

function FeedbackStream(props) {
    const [feedbackLog, setFeedbackLog] = useState(props.feedbackLog);
    const [personas, setPersonas] = useState(props.personas);
    const [editor, setEditor] = useState(props.editor);
    const [expandedItems, setExpandedItems] = useState({});
    const [selectedTextIndex, setSelectedTextIndex] = useState(null);
    const [loading, setLoading] = useState(false);

    const feedbackContainerRef = useRef(null);

    const lc = useContext(LoggerContext);
    const logger = lc.logger;

    useEffect(() => {
        setFeedbackLog(props.feedbackLog);
    }, [props.feedbackLog]);

    useEffect(() => {
        setPersonas(props.personas);
    }, [props.personas]);

    useEffect(() => {
        setEditor(props.editor);
    }, [props.editor]);

    const toggleShowSelectedText = (index) => {
        setSelectedTextIndex(prevIndex => (prevIndex === index ? null : index));
        if(index !== selectedTextIndex) logger(LoggerEvents.FEEDBACK_CONTEXT, {"feedback": feedbackLog[index], "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
    };

    const jumpTo = (startIndex) => {
        const paragraphs = parseEditorData(editor.getData());
        let currentOffset = 0;
        let paragraphIndex = 0;

        while (currentOffset + paragraphs[paragraphIndex].length < startIndex) {
            currentOffset += paragraphs[paragraphIndex].length;
            paragraphIndex++;
        }

        $(".ck-content").scrollTop(
            $(".ck-content").scrollTop() +
            $(".ck-content").children().eq(paragraphIndex).position().top -
            $(".ck-content").height() / 2 +
            $(".ck-content").children().eq(paragraphIndex).height() / 2
        );

        $(".ck-content").children().eq(paragraphIndex).css('background-color', '#c0ffc8');

        const delay = ms => new Promise(res => setTimeout(res, ms));
        delay(1000).then(() => {
            $(".ck-content").children().eq(paragraphIndex).css('background-color', '');
        });
    };

    const handleCardClick = (feedback) => {
        const currentContent = editor.getData();

        const startIndex = currentContent.indexOf(feedback.userSelection);
        if (startIndex !== -1) {
            jumpTo(startIndex);
            logger(LoggerEvents.FEEDBACK_CLICK, {"feedbackText": feedback.feedback, "feedback_user_selection": feedback.userSelection, "successfull": true, "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
        } else {
            logger(LoggerEvents.FEEDBACK_CLICK, {"feedbackText": feedback.feedback, "feedback_user_selection": feedback.userSelection, "successfull": false, "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
        }
    };

    const generatePersonaComment = (personaId) => {
        if (loading) return;

        const model = editor.model;

        const firstPosition = model.document.selection.getFirstPosition();
        const lastPosition = model.document.selection.getLastPosition();

        const timestamp = new Date().getTime();

        const range = model.createRange(firstPosition, lastPosition);

        let selectedText = "";
        for (const item of range.getItems()) {
            selectedText += item.data;
        }

        if (selectedText.length < 10 /*|| this.state.personaDescription == ""*/) {
            return;
        }

        const start = Date.now();

        setLoading(true);

        let url = BACKEND_URL + "generatePersonaComment";
        var obj = {
            selectedText: selectedText,
            roleAttributes: personas[personaId].attributes.role,
            backgroundAttributes: personas[personaId].attributes.background,
            styleAttributes: personas[personaId].attributes.style,
            contentAttributes: personas[personaId].attributes.content,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            const personaComment = data["personaComment"];

            setLoading(false);
            saveToFeedbackLog(timestamp, personaId, personas[personaId].name, personaComment, selectedText, range);

            const end = Date.now();
            const generation_time = end - start;
            console.log(personas[personaId])
            logger(LoggerEvents.PERSONA_FEEDBACK_GENERATED, {"selectedText": selectedText, "persona": personas[personaId], "feedback": personaComment, "generation_time": generation_time, "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()})
        });

    };

    const saveToFeedbackLog = (timestamp, personaId, personaName, feedback, userSelection, range) => {
        const updatedFeedbackLog = [
            ...feedbackLog,
            { timestamp, personaId, personaName, feedback, userSelection, range },
        ]

        if (props.onFeedbackLogChange) {
            props.onFeedbackLogChange(updatedFeedbackLog);
        }
    };

    const parseEditorData = (editorData) => {
        const div = document.createElement('div');
        div.innerHTML = editorData;

        const paragraphs = Array.from(div.querySelectorAll('p'));

        const textArray = paragraphs.map(p => p.textContent.trim());

        return textArray;
    };

    const toggleExpandFeedback = (feedbackId) => {
        const wasExpanded = expandedItems[feedbackId];
        
        setExpandedItems(prevState => ({
            ...prevState,
            [feedbackId]: !prevState[feedbackId]
        }));
        if(wasExpanded) {
            logger(LoggerEvents.FEEDBACK_MORE, {"feedback": feedbackLog[feedbackId], "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
        } else {
            logger(LoggerEvents.FEEDBACK_LESS, {"feedback": feedbackLog[feedbackId], "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
        }
    };

    const removeFeedback = (uiIndex) => {
        const feedbackIndex = feedbackLog.length - 1 - uiIndex;
        const updatedFeedbackLog = [...feedbackLog];

        const feedbackToRemove = feedbackLog[feedbackIndex];

        updatedFeedbackLog.splice(feedbackIndex, 1);
        setFeedbackLog(updatedFeedbackLog);

        if (props.onFeedbackLogChange) {
            props.onFeedbackLogChange(updatedFeedbackLog);
        }

        logger(LoggerEvents.PERSONA_REMOVE, {"feedback": feedbackToRemove, "feedbackLog": feedbackLog, "personas": personas, "user_text": editor.getData()});
    };

    return (
        <div style={{ display: 'flex' }}>
            <div className="persona-column" style={{ width: '30%', overflowY: 'scroll', padding: '12px' }}>
                <Typography variant="h6" style={{ marginRight: '8px' }}>
                    Get Feedback from:
                </Typography>
                {personas.length === 0 && (
                    <Typography variant="body1" style={{ marginTop: '8px' }}>
                        No personas available. Click on "+" to add a persona.
                    </Typography>
                )}
                <div>
                    {personas.map((persona) => (
                        <Button
                            key={persona.id}
                            variant="contained"
                            color="primary"
                            style={{ margin: '4px' }}
                            onClick={() => generatePersonaComment(persona.id)}
                        >
                            {persona.name}
                        </Button>
                    ))}
                </div>
            </div>
            <Divider style={{ marginBottom: '16px' }} />
            <div className="feedback-column" style={{ width: '70%', overflowY: 'scroll', padding: '8px' }} ref={feedbackContainerRef}>
                <div className="loading-card">
                    {loading && (
                        <Card style={{ marginBottom: '8px', border: '1px solid #1976d2' }}>
                            <CardContent>
                                <Typography variant="body1">Loading...</Typography>
                            </CardContent>
                        </Card>
                    )}
                </div>
                {feedbackLog.slice().reverse().map((feedback, index) => (
                    <Card style={{ marginBottom: '8px', border: '1px solid #1976d2' }} key={index}>
                        <CardContent>
                            <div>
                                <div className="feedback-card-header">
                                    <h3>{feedback.personaName}</h3>
                                    <IconButton
                                        aria-label="delete"
                                        color="error"
                                        onClick={() => removeFeedback(index)}
                                        className="remove-feedback-button"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                                {expandedItems[index] ? (
                                    <p style={{ fontSize: '12pt' }} onClick={() => handleCardClick(feedback)}>{feedback.feedback}</p>
                                ) : (
                                    <p style={{ fontSize: '12pt' }} onClick={() => handleCardClick(feedback)}>{feedback.feedback.slice(0, 400)}...</p>
                                )}
                                <div style={{ marginTop: '8px' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => toggleExpandFeedback(index)}
                                    >
                                        {expandedItems[index] ? 'Less...' : 'More...'}
                                    </Button>
                                </div>
                                <div style={{ marginTop: '8px' }}>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => toggleShowSelectedText(index)}
                                    >
                                        {selectedTextIndex === index
                                            ? 'Hide Context'
                                            : 'Show Context'}
                                    </Button>
                                </div>
                                {selectedTextIndex === index && (
                                    <div style={{ padding: '8px' }}>
                                        <Typography variant="body1">
                                            <strong>Feedback is based on:</strong>
                                        </Typography>
                                        <Typography variant="body2" style={{ marginTop: '8px', marginBottom: '8px' }}>
                                            {feedback.userSelection}
                                        </Typography>
                                    </div>
                                )}

                                <p>
                                    {new Date(feedback.timestamp).toDateString()} |{' '}
                                    {new Date(feedback.timestamp).toLocaleTimeString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

    );
}

export default FeedbackStream;