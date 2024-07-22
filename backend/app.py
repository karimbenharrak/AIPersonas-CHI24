import os

import openai
from flask import Flask, redirect, render_template, request, url_for, jsonify
from flask_cors import CORS

import pandas as pd

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
openai.api_key = "PASTE_YOUR_API_KEY_HERE"

@app.route("/generatePersonaComment", methods=("GET", "POST"))
def generatePersonaComment():
    if request.method == "POST":
        some_json = request.get_json()
        print(some_json)

        selectedText = some_json["selectedText"]

        roleAttributes = some_json["roleAttributes"]
        backgroundAttributes = some_json["backgroundAttributes"]
        styleAttributes = some_json["styleAttributes"]
        contentAttributes = some_json["contentAttributes"]

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "Personas are defined using four fixed attributes: role, background, style, and content. Each attribute consists of user-defined key-value pairs. The possible key-value pairs are not predefined and can vary. Generate persona-specific feedback for the text snippet highlighted by the user, considering the persona's unique attributes and any additional key-value pairs that might be defined by the user. You will take the role of the persona and write from their viewpoint. Every key-value attribute that is included in the personas definition describes the persona and therefore you. The feedback should align with the persona's characteristics and viewpoint, providing insights, suggestions, or comments that are relevant to the persona's role, background, style preferences, and content preferences.\n\nInput:\nText: \"Selected text snippet from the user's editor.\"\nPersona:\n- Role: {\"key\": \"value\"}\n- Background: {\"key\": \"value\"}\n- Style: {\"key\": \"value\"}\n- Content: {\"key\": \"value\"}\n\nOutput: Generate persona-specific feedback for the provided text snippet. Write the feedback as if you would be this persona. Consider the role, background, style, and content preferences of the persona. Provide insights, suggestions, or comments that align with the persona's characteristics and viewpoint. Feel free to incorporate any additional key-value pairs defined by the user in the persona definition to enhance the relevance of the feedback. Write one continuous feedback that is not longer than 100 words."
                },
                {
                    "role": "user",
                    "content": "Input:\nText: \"Writing is important and ubiquitous for many people. Numerous tools have been developed to aid writers in their creative process by automatically performing spell and grammar checking or suggesting continuation phrases to increase human performance and productivity. Yet, good writing goes beyond correct spelling and grammar – it needs to both convey the writer’s intention and address the reader’s needs. Writing is a complex cognitive activity, as pointed out by Flower and Hayes [12]. In particular, writing interweaves various sub-activities. Revision is one of them, which is important but often challenging for several reasons: (1) Practically, investing into preparations for writing or repeated revisions often stands at a tension to fnishing the work. (2) Organizationally, as the body of text grows, it is increasingly difcult to oversee the draft and maintain a big picture during writing. (3) Skill-related, it is tempting, in particular for amateurs, to focus on local revisions (e.g. word-level) instead of scope and structure [19]. Despite these challenges, providing assistance for the specifc activity of text revision has remained under-explored in HCI research, as pointed out in the community [4, 50, 51]. Recent work here focuses on the aforementioned local revisions (e.g. word replacement [16, 26], error correction [1, 11, 58]), increasingly applying Artifcial Intelligence (AI) methods from Natural Language Processing (NLP). However, such co-creative use of AI has not been examined yet for higher-level revisions. These aspects motivate our research question for this paper: How might we enable writers to beneft from computational (NLP/AI) capabilities beyond text generation and correction, in particular for revision? We address this question by exploring how we might support refection and (structural) revision via automatic summarization. This approach was inspired by taking an existing cognitive strategy for revision as a starting point, namely reverse outlining [19]: Writers manually create reverse outlines after a part of the draft has been written, summarizing it, to refect and identify opportunities for improvements. This guided our design and prototype: We automate this summarization to continuously update paragraph-wise summaries shown to writers next to their text.\"\nPersona:\n- Role: {\"role\": \"reviewer\", \"task\": \"evaluate the paper\"}\n- Background: {\"background\": \"PhD student in computer science\"}\n- Style: {\"writing style\": \"formal\", \"word choice\": \"technical\", \"sentence structure\": \"complex\"}\n- Content: {\"content\": \"technical content\", \"content type\": \"research paper\", \"content domain\": \"computer science\"}"
                },
                {
                    "role": "assistant",
                    "content": "I appreciate the technical content and complex sentence structure of the text snippet. The author provides a comprehensive overview of the importance of writing and the challenges writers face during the revision process. The references to Flower and Hayes [12] and previous HCI research [4, 50, 51] demonstrate a solid understanding of the existing literature in the field. \n\nIt would be beneficial for the author to provide more specific examples or case studies where computational capabilities have been successfully utilized for revision. This would strengthen the argument for exploring AI methods beyond text generation and error correction. Additionally, I would suggest that the author discusses potential limitations or challenges associated with using automatic summarization for refection and revision. Addressing these concerns would enhance the credibility of the research question and encourage further investigation.\n\nIt is important for the author to maintain clarity and avoid unnecessary jargon. While the text is well-written, it would be helpful to simplify certain phrases for improved readability. For example, instead of \"as pointed out by Flower and Hayes [12],\" the author could write \"as Flower and Hayes [12] noted.\" This slight modification removes unnecessary repetition and maintains the formal tone.\n\nOverall, the text snippet provides a strong foundation for evaluating the research paper. However, adding specific examples, addressing potential limitations, and simplifying certain phrases would further enhance the quality of the paper."
                },
                {
                    "role": "user",
                    "content": "Input:\nText: \"In recent years, we have witnessed exponential growth in integrating artificial intelligence (AI) systems into various aspects of our daily lives. Large language models (LLMs) like ChatGPT and GPT4 have made it possible to generate grammatically correct and coherent text. LLMs can help you with research, generate outlines, provide suggestions for headlines, and even write entire paragraphs — all this in a matter of seconds. However, AI alone cannot replace the human touch that makes content engaging and emotionally resonant. Relying solely on AI to generate a desired output can limit the creativity and context necessary for quality content. This is where Human-AI collaboration comes into play: Humans and AI work together collaboratively and synergistically by leveraging the strengths of both to produce higher-quality work and achieve better results. Over the last few months, however, people have approached me asking why Human-AI collaboration is helpful when we can just use models like ChatGPT to generate our desired output instantaneously. While it might not always be correct, modifying the output is easy and quick. Models like ChatGPT are not always the best answer regarding content creation. While they can generate impressive output, there are limitations to their abilities, and it is not enough to rely on them alone. In this article, I will explain why a collaborative approach between content creators and AI is essential for achieving the best results.\"\nPersona:\n- Role: {}\n- Background: {\"occupation\": \"History Professor\", \"hobbies\": \"tennis, programming, swimming\"}\n- Style: {\"style\": \"formal\", \"grammar\": \"easy to understand\", \"writing theme\": \"more older words\"}\n- Content: {\"content type\": \"medium article\"}"
                },
                {
                    "role": "assistant",
                    "content": "I appreciate the author's use of older words and formal language in the text snippet. The introduction effectively highlights the exponential growth of AI and the capabilities of large language models (LLMs) such as ChatGPT and GPT4. It is important for the author to emphasize that while AI can generate grammatically correct and coherent content, it cannot replace the human touch required for creating engaging and emotionally resonant content.\n\nI particularly resonate with the author's advocacy for Human-AI collaboration in content creation. The mention of leveraging the strengths of both humans and AI to produce higher-quality work aligns with my belief as a History Professor. It would be beneficial for the author to provide specific examples of how this collaboration has proven successful in content creation. This will help strengthen the argument and provide tangible evidence to support the claim.\n\n While the grammar in the text snippet is well-constructed, the author could simplify certain phrases to enhance readability. For example, instead of \"Relying solely on AI to generate a desired output can limit the creativity and context necessary for quality content,\" the author could write \"Depending only on AI for content generation limits creativity and contextual understanding, which are vital for high-quality content.\"\n\nOverall, by taking these suggestions into account, the author can create a compelling and informative piece that will resonate with readers like me."
                },
                {
                    "role": "user",
                    "content": "Input:\nText: \"As an educator, my goal is to empower students with a variety of backgrounds, abilities, and goals to create and\ncritique technology. I aim for students I mentor or teach to build strong technical skills, and increase their enthusiasm for pursuing related opportunities in the future. To encourage student learning and future persistence,\nI employ evidence-based practices for creating engaging and inclusive learning environments including: (1) supporting individual goals, abilities, and backgrounds of students, (2) engaging students through active learning\nand student-driven projects, and (3) building technical skills through practice and feedback.\"\nPersona:\n- Role: {\"task\": \"evaluating job candidate based on teaching skills\"}\n- Background: {\"occupation\": \"Professor\", \"university\": \"UT Austin\", \"Department\": \"Computer Science\"}\n- Style: {\"style\": \"formal and clear language\", \"language\": \"inclusive\"}\n- Content: {\"desired content\": \"what will the candidate do different in classes?\"}"
                },
                {
                    "role": "assistant",
                    "content": "When evaluating teaching candidates, it would be beneficial for the candidate to elaborate on what sets them apart in their approach to teaching. In line with the desired content, it would be valuable to understand how the candidate plans to create a distinctive learning experience for students. This could include specific strategies or methodologies they employ to go beyond traditional teaching and engage students in actively-driven projects. Providing innovative examples or experiences that demonstrate how they support individual goals, abilities, and backgrounds can further highlight the candidate's teaching expertise.\n\nIt is important for the candidate to communicate their ideas clearly and concisely. The text snippet already exhibits these qualities, but the candidate should make sure to use inclusive language and avoid any ambiguous statements. For example, instead of saying \"I employ evidence-based practices for creating engaging and inclusive learning environments,\" the candidate could say \"I actively incorporate evidence-based practices to create inclusive and engaging learning environments that support the needs of students with diverse backgrounds and abilities.\"\n\nOverall, the text snippet provides a good foundation for evaluating the teaching skills of a job candidate. Highlighting innovative teaching techniques, providing specific examples, and using inclusive language will help the candidate stand out and demonstrate their ability to create impactful and engaging learning experiences for students."
                },
                {
                    "role": "user",
                    "content": "Input:\nText: \"" + selectedText + "\"\nPersona:\n- Role: " + str(
                        roleAttributes) + "\n- Background: " + str(backgroundAttributes) + "\n- Style: " + str(
                        styleAttributes) + "\n- Content: " + str(contentAttributes)
                },
            ],
            temperature=1,
            max_tokens=512,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        print(response.choices[0])

        result = response.choices[0].message.content
        
        return jsonify({"personaComment": result})


# Logging calls
# Logging codes: FEEDBACK_REQUEST,

PARTICIPANT_ID = 99
# logging_df = pd.DataFrame({'timestamp': [], 'logging_code': [], 'user_text': [], 'persona_description': [], 'user_selection': [], 'feedback': []})

@app.route("/logging/feedback_request", methods=("GET", "POST"))
def logFeedbackRequest():
    if request.method == "POST":
        some_json = request.get_json()

        persona_description = some_json['persona_description']
        user_text = some_json['user_text']
        user_selection = some_json['user_selection']
        feedback = some_json['feedback']
        timestamp = some_json['timestamp']

        logging_df = pd.read_csv("./logging_participant_{}.csv".format(PARTICIPANT_ID), index_col=0)

        logging_df = logging_df.append({'timestamp': timestamp, 'logging_code': 'FEEDBACK_REQUEST', 'user_text': user_text, 'persona_description': persona_description, 'user_selection': user_selection, 'feedback': feedback}, ignore_index=True)
        logging_df.to_csv("./logging_participant_{}.csv".format(PARTICIPANT_ID))

        return jsonify(result=True)


if __name__ == '__main__':
    app.run(debug=True)
