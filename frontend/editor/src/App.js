import React, { Component, useState } from 'react';
import './App.css';
import PersonaForm from './components/PersonaForm';
import PersonaDefinition from './components/PersonaDefinition';
import FeedbackStream from './components/FeedbackStream';
import * as ReactTabs from 'react-tabs';

import { Configuration, OpenAIApi } from 'openai';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { Grid, Row, Col } from 'react-flexbox-grid'
import Button from 'react-bootstrap/Button';

import { Typography, IconButton, Paper } from '@mui/material';
import { InfoOutlined, Clear } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

// studyAlign related imports
import Topbar from './components/Topbar';
import useLogger, { LoggerEvents } from "./logger/logger";
import { CheckLg, Save, Save2Fill } from "react-bootstrap-icons";

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const LoggerContext = React.createContext(null);

// Refactor App class component into a functional component
function App() {


    const prototypeConfig = {
        wordCountLimit: 300,
        initialDocumentText: "<p>Nanoparticle-based drugs have the potential for improved targeting of cancer cells. This is because nanoparticles are tiny vehicles that can be engineered to transport drugs to tumors. Their design changes their ability to move in the body, and correctly target cancer cells. A bioengineer might, for example, change the size, charge or material of the nanoparticle, coat the nanoparticles with molecules that make them easy to recognize by cancer cells, or load them with different drugs to kill cancer cells. Using the new EVONANO platform, the team were able to simulate simple tumors, and more complex tumors with cancer stem cells, which are sometimes difficult to treat and lead to relapse of some cancer patients. The strategy identified nanoparticle designs that were known to work in previous research, as well as potential new strategies for nanoparticle design.</p><p>The paper, \"Evolutionary computational platform for the automatic discovery of nanocarriers for cancer treatment,\" is published today in the Nature journal Computational Materials. The paper is the result of the European project EVONANO which involves Dr. Sabine Hauert and Dr. Namid Stillman from the University of Bristol, and is led by Dr. Igor Balaz at the University of Novi Sad.<br>\"Simulations enable us to test many treatments, very quickly, and for a large variety of tumors. We are still at the early stages of making virtual tumors, given the complex nature of the disease, but the hope is that even these simple digital tumors can help us more efficiently design nanomedicines for cancer,\" said Dr. Hauert. Dr. Hauert said having the software to grow and treat virtual tumors could prove useful in the development of targeted cancer treatments. \"In the future, creating a digital twin of a patient tumor could enable the design of new nanoparticle treatments specialized for their needs, without the need for extensive trial and error or laboratory work, which is often costly and limited in its ability to quickly iterate on solutions suited for individual patients,\" said Dr. Hauert.</p><p>The EVONANO platform allows scientists to grow virtual tumors and use artificial intelligence to automatically optimize the design of nanoparticles to treat them. The ability to grow and treat virtual tumors is an important step towards developing new therapies for cancer. Importantly, scientists can use virtual tumors to optimize design of nanoparticle-based drugs before they are tested in the laboratory or patients. As Dr. Balaz highlights: \"The tool we developed in EVONANO represents a rich platform for testing hypotheses on the efficacy of nanoparticles for various tumor scenarios. The physiological effect of tweaking nanoparticle parameters can now be simulated at the level of detail that is nearly impossible to achieve experimentally.\" The challenge is then to design the right nanoparticle. Using a machine learning technique called artificial evolution, the researchers fine tune nanoparticle designs until they can treat all scenarios tested while preserving healthy cells to limit potential side-effects.</p><p>Dr. Stillman, co-lead author on the paper with Dr. Balaz, says that “this was a big team effort involving computational researchers across Europe over the past three years. I think this demonstrates the power of combining computer simulations with machine learning to find new and exciting ways to treat cancer.”</p><p>In the future, the team aims to use such a platform to bring digital twins closer to reality by using data from individual patients to grow virtual versions of their tumors, and then optimize treatments that are right for them. In the nearer term, the platform will be used to discover new nanoparticle strategies that can be tested in the laboratory. The software is open source, so there is also hope other researchers will use it to build their own AI-powered cancer nanomedicine. \"To get closer to clinical practice, in our future work we will focus on replicating tumor heterogeneity and drug resistance emergence. We believe these are the most important aspects of why cancer therapy for solid tumors often fails,\" said Dr. Balaz.</p>",
        documentName: "Using Persona Feedback as Writing Support",
        documentDescription: "You can define new personas and their attributes in the sidebar and generate feedback based on your selected text when clicking on the respective persona in the tab 'Feedback History'.",
        infoModalTitle: "Task Briefing",
        infoModalText: "<div style=\"margin-top: 30px; color: #48535A; max-width: 600px; margin-left: auto; margin-right: auto;font-size: 15px; line-height: 1.43;\"><p style=\"margin-bottom: 18px;\">The following text will give you some introductory information about the system you will be using and its functionalities. Furthermore, we will describe your upcoming writing task. Please read everything so that you understand how to use our system.</p><p style=\"margin-bottom: 18px;\"><strong>System description:</strong><br />The system consists of two main components: an editor and a sidebar. The editor component shows a blank page that can be used like a usual editor. It will likely remind you of the layout of Google Docs and can be treated like such an editor. The sidebar initially consists of one tab called <strong>Feedback History</strong>. This tab is used to generate feedback from previously defined personas and to show the chronologically sorted by time. The feedback show at the top will always be the most recent one and cards below it will be of descending time. Initially, there will not be an option to generate feedbacks as you first need to <strong>define a persona</strong>. To add a new persona, you need to click on the <strong>+</strong> in the tab list. This will create a new empty persona. If you click on the newly created tab, you will see a form to define your personas. The input field at the top allows you to give your persona a name to allow distinguishing between multiple personas. Every persona's attributes can be clustered into four categories: <strong>Role/Task of Persona, Persona Background, Style Preferences, and Text Preferences</strong>. To add new attributes to a persona's definition, you can define a new attribute name and its description and add the row to the respective category. <strong>There is no right or wrong in how you define those attribute-description pairs.</strong> If you want to remove an attribute-description pair, you can click on the delete icon at the end of the respective row. You may also want to remove a previously defined persona. In this case you can click on the X symbol in the respective tab. Once you have defined a persona, you will see that your personas will show up in the <strong>Feedback History</strong> tab. By selecting the text in the editor that you want to receive feedback on and clicking on the respective persona that you want to give feedback, the system will generate a feedback response and adds it to the Feedback History. In case you want to remove feedback that you have previously received, click on the trash icon in the respective card. If you want to see more context on what the feedback is based on, you can click on the respective button.<p style=\"margin-bottom: 18px;\"><strong>Your task:</strong><br />Write a text of your choice. You can (and in fact: should) interact with our system during the writing task. Throughout the writing task you will be thinking aloud and share your thoughts to the interviewer. The interviewer might ask you questions in case of interesting observations.<p style=\"margin-bottom: 18px;\"><strong>Allowed Languages:</strong><br />English (German can be used as well, but the AI will likely respond in English and the response will take much longer)</p><p style=\"margin-bottom: 18px;\"><p style=\"margin-bottom: 18px;\"><strong>General notes and recommendation for the usage:</strong><ul><li>Generating feedback takes up to 10 seconds. Please wait until the response will show up in the Feedback History.</li><li>You can have other tabs opened in your browser and you are allowed to switch to them in case you want to extract information from there for your writing.</li>",
    };



    const [editor, setEditor] = useState(null);
    const [personas, setPersonas] = useState([
        {
            id: 0, name: "CS PhD Student", definition: "This is the definition of persona 1", attributes: {
                role: { "role": "reviewer", "task": "evaluate the paper" },
                background: { "background": "PhD student in computer science" },
                style: { "writing style": "formal", "word choice": "technical", "sentence structure": "complex" },
                content: { "content": "technical content", "content type": "research paper", "content domain": "computer science" },
            }
        }
    ]);
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const [feedbackLog, setFeedbackLog] = useState([]);

    const [isReady, studyAlignLib, logger] = useLogger("appLogger", "https://hciaitools.uni-bayreuth.de/study-align-sec/", 11);

    const handleAttributesChange = (newAttributes, personaId, type) => {
        const updatedPersonas = personas.map((persona, index) => {
            if (index === personaId) {
                return { ...persona, attributes: newAttributes };
            }
            return persona;
        });
        setPersonas(updatedPersonas);

        logger(LoggerEvents.PERSONA_ATTRIBUTE_CHANGED, { "change_type": type, "newAttributes": newAttributes, "persona": personas[personaId], personas: updatedPersonas, "feedbackLog": feedbackLog, "editor": editor.getData() });
    }

    const handleAddNewPersona = () => {
        const newPersona = {
            id: personas.length, name: "Persona " + (personas.length + 1), definition: "This is the definition of persona " + (personas.length + 1), attributes: {
                role: {},
                background: {},
                style: {},
                content: {},
            }
        };

        // Create a new copy of the personas array with the new persona added
        const updatedPersonas = [...personas, newPersona];
        setPersonas(updatedPersonas);

        logger(LoggerEvents.PERSONA_ADDED, { "newPersona": newPersona, "personas": updatedPersonas, "feedbackLog": feedbackLog, "editor": editor.getData() });
    }

    const handleRemovePersona = (personaId) => {
        const removedPersona = personas[personaId];
        const updatedPersonas = personas.filter((persona) => persona.id !== personaId);

        updatedPersonas.forEach((persona, index) => {
            if (persona.id >= personaId) {
                persona.id = persona.id - 1;
            }
        });

        setPersonas(updatedPersonas);

        logger(LoggerEvents.PERSONA_REMOVED, { "removedPersona": removedPersona, "personas": updatedPersonas, "feedbackLog": feedbackLog, "editor": editor.getData() });
    }

    const handleNameChange = (newName, personaId) => {
        const updatedPersonas = personas.map((persona, index) => {
            if (index === personaId) {
                return { ...persona, name: newName };
            }
            return persona;
        });
        setPersonas(updatedPersonas);
    }

    const handleFeedbackLogChange = (updatedFeedbackLog) => {
        setFeedbackLog(updatedFeedbackLog);
    }

    const saveToProceed = async () => {
        const url = new URL(window.location.href);
        const participantToken = url.searchParams.get("participant_token");
        try {
            await studyAlignLib.updateNavigator(participantToken, "condition", "done");
        } catch (e) {
            console.warn("StudyAlign Navigator could not be updated");
        }
    };

    const saveButton = <Button size="sm" variant="primary" onClick={() => {
        logger(LoggerEvents.FINAL_TEXT, { "personas": personas, "feedbackLog": feedbackLog, "text": editor.getData() });
        saveToProceed();
    }}><CheckLg size={16} style={{ position: "relative", top: "-1px", marginRight: "5px" }} /> Save Text To Proceed</Button>;

    const tabs = [];
    const tabPanels = [];

    tabs.push(
        editor ? (
            <ReactTabs.Tab key="feedback-stream" className="personas-tab">
                <Typography style={{ fontSize: '18px', padding: '6px' }} onClick={() => logger(LoggerEvents.FEEDBACK_HISTORY_CLICK, { "personas": personas, "feedbackLog": feedbackLog, "editor": editor.getData() })}>
                    Feedback History
                </Typography>
            </ReactTabs.Tab>
        ) : null
    );

    tabPanels.push(
        editor ? (
            <ReactTabs.TabPanel key="feedback-stream" className="personas-tab-panel">
                <FeedbackStream feedbackLog={feedbackLog} personas={personas} editor={editor} onFeedbackLogChange={handleFeedbackLogChange}></FeedbackStream>
            </ReactTabs.TabPanel>
        ) : null
    );

    personas.forEach((persona, index) => {
        tabs.push(
            <ReactTabs.Tab key={persona.name} className="personas-tab" onClick={() => logger(LoggerEvents.PERSONA_SELECTED, { "persona": persona, "personas": personas, "feedbackLog": feedbackLog, "editor": editor.getData() })}>
                {persona.name}
                <IconButton onClick={() => handleRemovePersona(persona.id)}>
                    <Clear />
                </IconButton>
            </ReactTabs.Tab>
        );

        tabPanels.push(
            <ReactTabs.TabPanel key={persona.name} className="personas-tab-panel">
                <PersonaDefinition persona={persona} editor={editor} onAttributesChange={handleAttributesChange} onNameChange={handleNameChange} />
            </ReactTabs.TabPanel>
        );
    }
    );


    return (
        <LoggerContext.Provider value={{
            studyAlignLib: studyAlignLib,
            logger: logger
        }}>
            <Topbar documentName={prototypeConfig.documentName}
                description={prototypeConfig.documentDescription}
                infoModalText={prototypeConfig.infoModalText}
                infoModalTitle={prototypeConfig.infoModalTitle}
                saveButton={saveButton}
            />
            <Grid fluid className="app-main">
                <Col className="content-column" xs={7} sm={712} md={7} lg={7} onClick={() => logger(LoggerEvents.EDITOR_FOCUS, { "personas": personas, "feedbackLog": feedbackLog, "editor": editor.getData() })}>
                    <div className="document-editor">
                        <div className="document-editor__toolbar"></div>
                        <div className="document-editor__editable-container">
                            <CKEditor
                                onReady={editor => {
                                    console.log('Editor is ready to use!', editor);

                                    // Insert the toolbar before the editable area.

                                    // Add these two lines to properly position the toolbar
                                    const toolbarContainer = document.querySelector('.document-editor__toolbar');
                                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);

                                    //this.editor = editor;
                                    setEditor(editor);
                                }}
                                onError={(error, { willEditorRestart }) => {
                                    // If the editor is restarted, the toolbar element will be created once again.
                                    // The `onReady` callback will be called again and the new toolbar will be added.
                                    // This is why you need to remove the older toolbar.
                                    if (willEditorRestart) {
                                        editor.ui.view.toolbar.element.remove();
                                    }
                                }}
                                onChange={(event, editor) => console.log({ event, editor })}
                                onKeyDown={e => { logger(LoggerEvents.KEY_DOWN, e.nativeEvent, { "text": editor.getData() }); }}
                                editor={DecoupledEditor}
                                data={prototypeConfig.initialDocumentText}
                                config={{
                                    toolbar: {
                                        items: [
                                            'undo', 'redo',
                                            '|', 'heading',
                                            '|', 'bold', 'italic',
                                            '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed',
                                            '|', 'bulletedList', 'numberedList', 'outdent', 'indent'
                                        ]
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} onClick={() => logger(LoggerEvents.SIDEBAR_FOCUS, { "personas": personas, "feedbackLog": feedbackLog, "editor": editor.getData() })}>
                    <div>
                        <ReactTabs.Tabs
                            selectedIndex={selectedTabIndex}
                            onSelect={(selectedTabIndex) => setSelectedTabIndex(selectedTabIndex)}
                            selectedTabClassName="personas-tab--selected"
                            selectedTabPanelClassName="personas-tab-panel--selected"
                        >
                            <ReactTabs.TabList className="personas-tab-list">
                                {tabs}
                                <IconButton onClick={handleAddNewPersona} aria-label="add">
                                    <AddIcon />
                                </IconButton>

                            </ReactTabs.TabList>
                            {tabPanels}
                        </ReactTabs.Tabs>
                    </div>
                </Col>
            </Grid>
        </LoggerContext.Provider>
    );
}

export default App;