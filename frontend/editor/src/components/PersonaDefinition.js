import React, { Component, useState, useContext } from 'react';
import {
    Tooltip,
    Popover,
    IconButton,
    Button,
    TextField,
    Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

// studyAlign
import {LoggerEvents} from "../logger/logger";
import {LoggerContext} from "../App";


function PersonaForm(props) {
    const [name, setName] = useState(props.persona.name);
    const [text, setText] = useState(props.persona.attributes ? JSON.stringify(props.persona.attributes, null, 2) : '');
    const [editor, setEditor] = useState(props.editor);
    const [feedbackLog, setFeedbackLog] = useState(props.feedbackLog);

    const [newKeyRole, setNewKeyRole] = useState('');
    const [newValueRole, setNewValueRole] = useState('');
    const [newKeyBackground, setNewKeyBackground] = useState('');
    const [newValueBackground, setNewValueBackground] = useState('');
    const [newKeyStyle, setNewKeyStyle] = useState('');
    const [newValueStyle, setNewValueStyle] = useState('');
    const [newKeyContent, setNewKeyContent] = useState('');
    const [newValueContent, setNewValueContent] = useState('');

    const [infoWindowAnchor, setInfoWindowAnchor] = useState(null);
    const [infoWindowSection, setInfoWindowSection] = useState('');


    const lc = useContext(LoggerContext);
    const logger = lc.logger;



    const handleOpenInfoWindow = (event, section) => {
        setInfoWindowAnchor(event.currentTarget);
        setInfoWindowSection(section);
    };

    const handleCloseInfoWindow = () => {
        setInfoWindowAnchor(null);
        setInfoWindowSection('');
    };

    const handleChangeRole = (event) => {
        const newValue = event.target.value;

        let attributes = JSON.parse(text);
        attributes.role[event.target.name] = newValue;

        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);

        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "CHANGE_ROLE");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleChangeBackground = (event) => {
        const newValue = event.target.value;
    
        let attributes = JSON.parse(text);
        attributes.background[event.target.name] = newValue;
    
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);
    
        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "CHANGE_BACKGROUND");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    
    const handleChangeStyle = (event) => {
        const newValue = event.target.value;
    
        let attributes = JSON.parse(text);
        attributes.style[event.target.name] = newValue;
    
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);
    
        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "CHANGE_STYLE");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };
    
    const handleChangeContent = (event) => {
        const newValue = event.target.value;
    
        let attributes = JSON.parse(text);
        attributes.content[event.target.name] = newValue;
    
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);
    
        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "CHANGE_CONTENT");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleNewKeyChangeRole = (event) => {
        setNewKeyRole(event.target.value);
    };

    const handleNewValueChangeRole = (event) => {
        setNewValueRole(event.target.value);
    };

    const handleNewKeyChangeBackground = (event) => {
        setNewKeyBackground(event.target.value);
    };

    const handleNewValueChangeBackground = (event) => {
        setNewValueBackground(event.target.value);
    };

    const handleNewKeyChangeStyle = (event) => {
        setNewKeyStyle(event.target.value);
    };

    const handleNewValueChangeStyle = (event) => {
        setNewValueStyle(event.target.value);
    };

    const handleNewKeyChangeContent = (event) => {
        setNewKeyContent(event.target.value);
    };

    const handleNewValueChangeContent = (event) => {
        setNewValueContent(event.target.value);
    };

    const handleAddRowRole = () => {
        if (newKeyRole && newValueRole) {
            let attributes = JSON.parse(text);
            attributes.role[newKeyRole] = newValueRole;

            const newText = JSON.stringify(attributes, null, 2);
            setText(newText);

            if (props.onAttributesChange) {
                props.onAttributesChange(attributes, props.persona.id, "ADD_ROLE");
            }

            setNewKeyRole('');
            setNewValueRole('');
        }
    };

    const handleRemoveRowRole = (key) => {
        let attributes = JSON.parse(text);
        delete attributes.role[key];
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);

        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "REMOVE_ROLE");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleAddRowBackground = () => {
        if (newKeyBackground && newValueBackground) {
            let attributes = JSON.parse(text);
            attributes.background[newKeyBackground] = newValueBackground;

            const newText = JSON.stringify(attributes, null, 2);
            setText(newText);

            if (props.onAttributesChange) {
                props.onAttributesChange(attributes, props.persona.id, "ADD_BACKGROUND");
            }

            setNewKeyBackground('');
            setNewValueBackground('');
        }
    };

    const handleRemoveRowBackground = (key) => {
        let attributes = JSON.parse(text);
        delete attributes.background[key];
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);

        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "REMOVE_BACKGROUND");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleAddRowStyle = () => {
        if (newKeyStyle && newValueStyle) {
            let attributes = JSON.parse(text);
            attributes.style[newKeyStyle] = newValueStyle;

            const newText = JSON.stringify(attributes, null, 2);
            setText(newText);

            if (props.onAttributesChange) {
                props.onAttributesChange(attributes, props.persona.id, "ADD_STYLE");
            }

            setNewKeyStyle('');
            setNewValueStyle('');
        }
    };

    const handleRemoveRowStyle = (key) => {
        let attributes = JSON.parse(text);
        delete attributes.style[key];
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);

        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "REMOVE_STYLE");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleAddRowContent = () => {
        if (newKeyContent && newValueContent) {
            let attributes = JSON.parse(text);
            attributes.content[newKeyContent] = newValueContent;

            const newText = JSON.stringify(attributes, null, 2);
            setText(newText);

            if (props.onAttributesChange) {
                props.onAttributesChange(attributes, props.persona.id, "ADD_CONTENT");
            }

            setNewKeyContent('');
            setNewValueContent('');
        }
    };

    const handleRemoveRowContent = (key) => {
        let attributes = JSON.parse(text);
        delete attributes.content[key];
        const newText = JSON.stringify(attributes, null, 2);
        setText(newText);

        try {
            const newAttributes = JSON.parse(newText);
            if (props.onAttributesChange) {
                props.onAttributesChange(newAttributes, props.persona.id, "REMOVE_CONTENT");
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    const handleChangeName = (event) => {
        const newName = event.target.value;
        const oldName = name;
        setName(newName);
        logger(LoggerEvents.PERSONA_NAME_CHANGED, { "persona": persona, "newName": newName, "oldName": oldName, "feedbackLog": feedbackLog, "editor": editor.getData()})
    };

    const handleNameBlur = () => {
        if (props.onNameChange) {
            props.onNameChange(name, props.persona.id);
        }
    };

    const { persona } = props;
    const role = persona.attributes.role || {};
    const background = persona.attributes.background || {};
    const style = persona.attributes.style || {};
    const content = persona.attributes.content || {};

    return (
        <div className="nav-column">
                <Popover
                    open={Boolean(infoWindowAnchor)}
                    anchorEl={infoWindowAnchor}
                    onClose={handleCloseInfoWindow}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <div style={{ padding: '10px' }}>
                        {/* Here you can put the detailed information for each section */}
                        {infoWindowSection === 'Role/Task of Persona' && <div><p>This section includes attributes that describe the role or task of this persona.</p><p>Examples of attribute-description pairs:</p><li>Role: Reviewer</li><li>Task: Review the paper</li><li>Goal: Make a decision whether this paper should be accepted</li></div>}
                        {infoWindowSection === 'PersonaBackground' && <div><p>This section includes attributes that describe the background of this persona.</p><p>Examples of attribute-description pairs:</p><li>Hobbies: Fishing, Reading news articles, bicycling</li><li>Interests: Finance, Geography</li><li>Occupation: Economics Professor</li></div>}
                        {infoWindowSection === 'StylePreferences' && <div><p>This section includes attributes that describe style preferences of this persona.</p><p>Examples of attribute-description pairs:</p><li>Writing Style: formal</li><li>Word choice: technical</li><li>Sentence structure: complex, nested sentences</li></div>}
                        {infoWindowSection === 'ContentPreferences' && <div><p>This section includes attributes that describe content preferences of this persona.</p><p>Examples of attribute-description pairs:</p><li>Content: technical content</li><li>Content type: research paper</li><li>Content domain: Finance, Economics</li></div>}
                    </div>
                </Popover>


                <div>
                    <TextField
                        label="Persona Name"
                        value={name}
                        onChange={handleChangeName}
                        onBlur={handleNameBlur}
                        style={{ marginBottom: '18px' }}
                    />
                </div>
                {/* <p><textarea type='text' value={persona.definition}/></p> */}
                <div>
                    <Typography variant="h6" style={{ marginBottom: '12px' }}>
                        Role/Task of Persona
                        <Tooltip title="More Info">
                            <IconButton
                                onClick={(event) =>
                                    handleOpenInfoWindow(event, 'Role/Task of Persona')
                                }
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>


                {Object.keys(role).map((key) => (
                    <div key={key} className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>
                            <label>{key}</label>
                        </div>
                        <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                        <div style={{ flex: '2' }}>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={role[key]}
                                onChange={handleChangeRole}
                            />
                        </div>
                        <DeleteIcon
                            color="error"
                            onClick={() => handleRemoveRowRole(key)}
                            style={{ cursor: 'pointer', margin: '0 10px' }}
                        />
                    </div>
                ))}

                <div className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>
                        <TextField
                            label="New Attribute"
                            variant="outlined"
                            name="newKey"
                            value={newKeyRole}
                            onChange={handleNewKeyChangeRole}
                            fullWidth
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                    <div style={{ flex: '2' }}>
                        <TextField
                            label="New Description"
                            variant="outlined"
                            name="newValue"
                            value={newValueRole}
                            onChange={handleNewValueChangeRole}
                            multiline
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddRowRole}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Row
                    </Button>
                </div>
                <hr />


                <div>
                    <Typography variant="h6" style={{ marginBottom: '12px' }}>
                        Persona Background
                        <Tooltip title="More Info">
                            <IconButton
                                onClick={(event) =>
                                    handleOpenInfoWindow(event, 'PersonaBackground')
                                }
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>


                {Object.keys(background).map((key) => (
                    <div key={key} className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>
                            <label>{key}</label>
                        </div>
                        <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                        <div style={{ flex: '2' }}>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={background[key]}
                                onChange={handleChangeBackground}
                            />
                        </div>
                        <DeleteIcon
                            color="error"
                            onClick={() => handleRemoveRowBackground(key)}
                            style={{ cursor: 'pointer', margin: '0 10px' }}
                        />
                    </div>
                ))}

                <div className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>
                        <TextField
                            label="New Attribute"
                            variant="outlined"
                            name="newKey"
                            value={newKeyBackground}
                            onChange={handleNewKeyChangeBackground}
                            fullWidth
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                    <div style={{ flex: '2' }}>
                        <TextField
                            label="New Description"
                            variant="outlined"
                            name="newValue"
                            value={newValueBackground}
                            onChange={handleNewValueChangeBackground}
                            multiline
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddRowBackground}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Row
                    </Button>
                </div>
                <hr />

                <div>
                    <Typography variant="h6" style={{ marginBottom: '12px' }}>
                        Style Preferences
                        <Tooltip title="More Info">
                            <IconButton
                                onClick={(event) =>
                                    handleOpenInfoWindow(event, 'StylePreferences')
                                }
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>

                {Object.keys(style).map((key) => (
                    <div key={key} className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>
                            <label>{key}</label>
                        </div>
                        <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                        <div style={{ flex: '2' }}>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={style[key]}
                                onChange={handleChangeStyle}
                            />
                        </div>
                        <DeleteIcon
                            color="error"
                            onClick={() => handleRemoveRowStyle(key)}
                            style={{ cursor: 'pointer', margin: '0 10px' }}
                        />
                    </div>
                ))}

                <div className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>
                        <TextField
                            label="New Attribute"
                            variant="outlined"
                            name="newKey"
                            value={newKeyStyle}
                            onChange={handleNewKeyChangeStyle}
                            fullWidth
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                    <div style={{ flex: '2' }}>
                        <TextField
                            label="New Description"
                            variant="outlined"
                            name="newValue"
                            value={newValueStyle}
                            onChange={handleNewValueChangeStyle}
                            multiline
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddRowStyle}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Row
                    </Button>
                </div>
                <hr />

                <div>
                    <Typography variant="h6" style={{ marginBottom: '12px' }}>
                        Content Preferences
                        <Tooltip title="More Info">
                            <IconButton
                                onClick={(event) =>
                                    handleOpenInfoWindow(event, 'ContentPreferences')
                                }
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </div>

                {Object.keys(content).map((key) => (
                    <div key={key} className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1' }}>
                            <label>{key}</label>
                        </div>
                        <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                        <div style={{ flex: '2' }}>
                            <TextField
                                multiline
                                fullWidth
                                variant="outlined"
                                name={key}
                                value={content[key]}
                                onChange={handleChangeContent}
                            />
                        </div>
                        <DeleteIcon
                            color="error"
                            onClick={() => handleRemoveRowContent(key)}
                            style={{ cursor: 'pointer', margin: '0 10px' }}
                        />
                    </div>
                ))}

                <div className="attribute-row" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>
                        <TextField
                            label="New Attribute"
                            variant="outlined"
                            name="newKey"
                            value={newKeyContent}
                            onChange={handleNewKeyChangeContent}
                            fullWidth
                        />
                    </div>
                    <div style={{ flex: '0 0 auto', margin: '0 10px' }}>:</div>
                    <div style={{ flex: '2' }}>
                        <TextField
                            label="New Description"
                            variant="outlined"
                            name="newValue"
                            value={newValueContent}
                            onChange={handleNewValueChangeContent}
                            multiline
                            fullWidth
                        />
                    </div>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddRowContent}
                        style={{ marginLeft: '10px' }}
                    >
                        Add Row
                    </Button>
                </div>
                <hr />

                {/*<button onClick={props.onGenerateFeedback(props.persona.id)}>Generate Feedback</button>*/}
            </div>
    );
}

export default PersonaForm;