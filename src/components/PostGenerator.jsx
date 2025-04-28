import React, { useState } from "react";
import axios from "axios";

const PostGenerator = () => {
  const [topic, setTopic] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [category, setCategory] = useState("Technology");
  const [tone, setTone] = useState("Formal");
  const [wordCount, setWordCount] = useState(""); // New state for word count
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);

    // Ensure the word count is a valid number
    if (isNaN(wordCount) || wordCount <= 0) {
      alert("Please enter a valid word count.");
      setIsGenerating(false);
      return;
    }

    try {
      const response = await axios.post("https://linkedinpostgenerator-27t7.onrender.com/generate", { topic, category, tone, wordCount });
      setGeneratedPost(response.data.post);
    } catch (error) {
      console.error("Error generating post:", error);
    } 
    setIsGenerating(false);
  };

  const copyPost = () => {
    navigator.clipboard.writeText(generatedPost).then(() => {
      alert("Post copied to clipboard!");
    });
  };

  const downloadImage = () => {
    alert("Image download feature coming soon!");
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">LinkedIn Post Generator</h1>
        <p className="text-lg text-gray-600">Create professional LinkedIn posts with ease</p>
      </header>

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
        <form onSubmit={handleGenerate}>
          {/* Post Description */}
          <div className="mb-6">
            <label htmlFor="post-description" className="block text-lg font-semibold text-gray-800 mb-2">Describe your post:</label>
            <input
              type="text"
              id="post-description"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Marketing tips, Tech updates"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Post Category */}
          <div className="mb-6">
            <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">Select Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Technology">Technology</option>
              <option value="Marketing">Marketing</option>
              <option value="Business">Business</option>
              <option value="Motivation">Motivation</option>
            </select>
          </div>

          {/* Tone of Voice */}
          <div className="mb-6">
            <label htmlFor="tone" className="block text-lg font-semibold text-gray-800 mb-2">Select Tone:</label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Formal">Formal</option>
              <option value="Casual">Casual</option>
              <option value="Motivational">Motivational</option>
            </select>
          </div>

          {/* Word Count Input */}
          <div className="mb-6">
            <label htmlFor="word-count" className="block text-lg font-semibold text-gray-800 mb-2">Desired Word Count:</label>
            <input
              type="number"
              id="word-count"
              value={wordCount}
              onChange={(e) => setWordCount(e.target.value)}
              placeholder="Enter desired word count"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isGenerating || !topic.trim() || !wordCount}
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-300"
          >
            {isGenerating ? 'Generating...' : 'Generate Post'}
          </button>
        </form>
      </div>

      {/* Generated Post Section */}
      {generatedPost && (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-8 max-w-lg mx-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Generated Post</h3>
          <p className="text-lg text-gray-800 mb-4">{generatedPost}</p>

          {/* Copy and Download Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={copyPost}
              className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Copy Text
            </button>
            <button
              onClick={downloadImage}
              className="w-full p-3 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              Download Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostGenerator;
