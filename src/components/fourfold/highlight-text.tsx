import React from "react";

interface HighlightedTextProps {
  text: string;
  phrase: string;
  className?: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  phrase,
  className = "text-accent",
}) => {
  if (!phrase.trim()) return <>{text}</>;
  if (!phrase.trim()) return <>{text}</>;

  const regex = new RegExp(`\\b(${phrase})\\b`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className={className || "text-accent"}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default HighlightedText;