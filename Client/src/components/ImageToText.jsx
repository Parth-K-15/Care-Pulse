import { useState } from "react";
import Tesseract from "tesseract.js";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export default function ImageToText() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [insights, setInsights] = useState("");
  const [insightsLoading, setInsightsLoading] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setText("");
      setInsights("");
    }
  };

  const extractText = async () => {
    if (!selectedImage) return;
    setLoading(true);
    setProgress(0);
    setText("");
    setInsights("");
    try {
      const { data } = await Tesseract.recognize(selectedImage, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });
      setText(data.text);
      fetchGeminiInsights(data.text);
    } catch (err) {
      setText(`Failed to extract text.\nError: ${err.message || err}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchGeminiInsights = async (ocrText) => {
    if (!GEMINI_API_KEY || !ocrText) return;
    setInsightsLoading(true);
    setInsights("");
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Extract and summarize key medical insights for a doctor from the following patient history:\n${ocrText}`,
                  },
                ],
              },
            ],
          }),
        }
      );
      const result = await response.json();
      const geminiText =
        result?.candidates?.[0]?.content?.parts?.[0]?.text || "No insights found.";
      setInsights(geminiText);
    } catch (err) {
      setInsights("Failed to get insights from Gemini. " + (err.message || err));
    } finally {
      setInsightsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a2e] p-4">
      <Card className="w-full max-w-lg shadow-2xl border-none bg-[#23272f]/80 backdrop-blur-lg">
        <CardHeader>
          <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
            <span className="inline-block animate-pulse">🩺</span> OCR Medical Insights
          </h2>
          <p className="text-sm text-gray-400">Upload an image to extract and summarize key medical insights.</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file:bg-[#18181b] file:text-white file:border-none file:rounded file:px-4 file:py-2 file:cursor-pointer file:transition-all file:hover:bg-[#23272f]"
            />
            {selectedImage && (
              <div className="mb-6">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-xl shadow-lg border border-gray-700"
                />
              </div>
            )}
            <Button
              variant="default"
              size="lg"
              className={clsx(
                "w-full font-semibold text-lg bg-gradient-to-r from-[#1a1a2e] to-[#23272f] text-white border-none shadow-lg shadow-blue-900/30 transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#23272f]",
                loading && "opacity-60 cursor-not-allowed"
              )}
              style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
              onClick={extractText}
              disabled={loading || !selectedImage}
            >
              {loading ? (
                <span>
                  <span className="animate-spin inline-block mr-2">⏳</span>
                  Processing ({progress}%)
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block">🚀</span>
                  <span>Extract Text</span>
                </span>
              )}
            </Button>
            {loading && (
              <div className="w-full">
                <div className="h-8 w-full bg-[#18181b] mb-2 rounded animate-pulse" />
                <Badge className="bg-blue-900 text-blue-300 animate-pulse">OCR Progress: {progress}%</Badge>
              </div>
            )}
            {text && (
              <div className="w-full">
                <div className="bg-[#18181b] border-none text-left text-white p-4 mt-2 shadow-lg rounded-xl">
                  <h3 className="font-bold mb-2 text-blue-300">Extracted Text:</h3>
                  <pre className="whitespace-pre-wrap text-sm">{text}</pre>
                </div>
              </div>
            )}
            {insightsLoading && (
              <div className="w-full">
                <div className="h-8 w-full bg-[#23272f] mb-2 rounded animate-pulse" />
                <Badge className="bg-yellow-900 text-yellow-300 animate-pulse">Extracting Key Insights...</Badge>
              </div>
            )}
            {insights && (
              <div className="w-full">
                <div className="bg-[#23272f] border-none text-left text-white p-4 mt-2 shadow-lg rounded-xl">
                  <h3 className="font-bold mb-2 text-green-300">Key Insights for Doctor:</h3>
                  <pre className="whitespace-pre-wrap text-sm">{insights}</pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}