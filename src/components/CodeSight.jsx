import React, { useState } from 'react';
import { OpenaiAPI } from '../services/OpenaiAPI'
import logo from '../images/logo.png'
const CodeSight = () => {
    const [inputCode, setInputCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFixErrors = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = null;

        const guidedMessage = "From the following code snippet fix errors on the code. Do not return any other text and Provide only one solution which should be code. This code should run as it is."
        try {

            response = await OpenaiAPI(inputCode, guidedMessage);
        } catch (err) {
            response = "Error while generating response"
        }
        // console.log(response);
        setLoading(false);
        setOutput(response);
    };

    const handleDocumentation = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = null;
        const guidedMessage = "From the following code snippet give a detailed documentaion out of it."

        try {
            response = await OpenaiAPI(inputCode, guidedMessage);
        } catch (err) {
            response = "Error while generating response"
        }
        // console.log(response);
        setLoading(false);
        setOutput(response);
    };

    const handleOptimize = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = null;

        const guidedMessage = "From the following code snippet optimize the code. Do not return any other text."
        try {
            response = await OpenaiAPI(inputCode, guidedMessage);
        } catch (err) {
            response = "Error while generating response"
        }
        // console.log(response);
        setLoading(false);
        setOutput(response);
    };

    const handleExplain = async (e) => {
        e.preventDefault();
        setLoading(true);
        let response = null;

        const guidedMessage = "Explain the following code snippet."
        try {
            response = await OpenaiAPI(inputCode, guidedMessage);
            // console.log(response);
        } catch (err) {
            response = "Error while generating response"
        }
        setLoading(false);
        setOutput(formatText(response));
    };

    function formatText(text) {
        const maxLineLength = 75;
        const paragraphs = text.split(/\s+\n/); // Split the text into paragraphs
      
        let formattedText = "";
      
        paragraphs.forEach((paragraph) => {
          let line = "";
          const words = paragraph.split(/\s+/); // Split each paragraph into words
      
          words.forEach((word) => {
            if (line.length + word.length > maxLineLength) {
              formattedText += line + "\n";
              line = "";
            }
      
            line += word + " ";
          });
      
          formattedText += line + "\n\n";
        });
      
        return formattedText.trim(); // Trim any trailing whitespace
      }

    return (
        <div className="h-screen v-screen">
            <div className="header text-4xl bg-black text-white w-screen h-[10%] px-20 py-3 flex flex-row items-center">
            <img src={logo} alt="" className='h-20' />
                CodeSight
            </div>

            <div className="main-section w-full h-[90%] flex justify-center items-center flex-col md:flex-row ">
                <div className="sidebar w-full md:w-[5%] h-[10%] md:h-full bg-gray-900"></div>
                <div className="w-full md:w-[47.5%] h-full bg-[#040c27] border border-white">
                    <form className="h-full w-full">
                        <div className="topbar w-full h-[10%] bg-gray-800 flex items-center justify-between">
                            <div className="flex space-x-4 ml-4">
                                <button
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleFixErrors}
                                >
                                    Fix Errors
                                </button>
                                <button
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleDocumentation}
                                >
                                    Documentation
                                </button>
                                <button
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleOptimize}
                                >
                                    Optimize
                                </button>
                                <button
                                    className="bg-blue-700 text-white px-4 py-2 rounded-md"
                                    onClick={handleExplain}
                                >
                                    Explain
                                </button>
                            </div>
                        </div>
                        <textarea
                            id="codeInput"
                            name="codeInput"
                            className="resize-none h-[85%] w-[95%] px-4 py-2 mr-4 bg-transparent text-white border-none focus:outline-none font-mono overflow-x-auto whitespace-pre"
                            placeholder="Your code here..."
                            value={inputCode}
                            onChange={(e) => setInputCode(e.target.value)}
                        ></textarea>
                    </form>
                </div>
                <div className="output-section bg-[#040c27] w-full md:w-[47.5%] h-full border border-white">
                    <div className="topbar w-full h-16 bg-gray-800 flex items-center justify-between text-xl text-center text-white px-10">
                        Output
                    </div>
                    <textarea
                        id="codeOutput"
                        name="codeOutput"
                        className="resize-none h-[85%] w-[95%] px-4 py-2 mr-4 bg-transparent text-white border-none focus:outline-none font-mono overflow-x-auto whitespace-pre"
                        placeholder="Your Output here..."
                        value={output}
                        onChange={(e) => { setOutput(e.target.value) }}
                    ></textarea>

                    {loading && (
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                            <div className="text-white">Loading...</div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CodeSight;
