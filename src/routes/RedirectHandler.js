import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { logEvent } from "../middleware/logger";

export default function RedirectHandler() {
  const { code } = useParams();

  useEffect(() => {
    const mappings = JSON.parse(localStorage.getItem("urlMappings") || "{}");
    const mapping = mappings[code];

    if (mapping && new Date(mapping.expiry) > new Date()) {
      // Log click
      const stats = JSON.parse(localStorage.getItem("clickStats") || "{}");
      stats[code] = stats[code] || [];
      stats[code].push({
        timestamp: new Date().toISOString(),
        source: document.referrer || "direct",
        location: "India (Mocked)"
      });
      localStorage.setItem("clickStats", JSON.stringify(stats));
      logEvent("redirect", `Redirected to ${mapping.originalUrl}`, { code });

      // Redirect
      window.location.href = mapping.originalUrl;
    } else {
      alert("Invalid or expired URL");
      logEvent("error", "Redirection failed or expired", { code });
    }
  }, [code]);

  return null;
}
