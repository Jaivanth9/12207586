import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    const mappings = JSON.parse(localStorage.getItem("urlMappings") || "{}");
    const data = mappings[shortcode];

    if (data && new Date() < new Date(data.expiry)) {
      // Update click stats
      const newClick = {
        timestamp: new Date().toISOString(),
        source: document.referrer,
        location: "India" // Static for now
      };
      data.clicks = data.clicks || [];
      data.clicks.push(newClick);
      mappings[shortcode] = data;
      localStorage.setItem("urlMappings", JSON.stringify(mappings));

      window.location.href = data.originalUrl;
    } else {
      alert("This link has expired or is invalid.");
      window.location.href = "/";
    }
  }, [shortcode]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
