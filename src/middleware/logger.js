export const log = async (stack, level, pkg, message) => {
  try {
    const validStacks = ["backend", "frontend"];
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    const validPackages = [
      "cache",
      "controller",
      "cron_job",
      "db",
      "domain"
    ];

    if (
      !validStacks.includes(stack) ||
      !validLevels.includes(level) ||
      !validPackages.includes(pkg)
    ) {
      throw new Error("Invalid log parameters. Please follow the allowed values.");
    }

    const payload = {
      stack,
      level,
      package: pkg,
      message
    };

    const response = await fetch("http://29.244.56.144/eva1uation-service/10gs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error("Log API returned an error:", response.statusText);
    }
  } catch (err) {
    console.error("Logging failed:", err.message);
  }
};
