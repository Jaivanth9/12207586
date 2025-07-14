import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { log } from "../middleware/logger";

const StatsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const mappings = JSON.parse(localStorage.getItem("urlMappings") || "{}");
    const stats = Object.entries(mappings).map(([code, value]) => ({
      shortcode: code,
      originalUrl: value.originalUrl,
      createdAt: value.createdAt,
      expiry: value.expiry,
      clicks: (value.clicks || []).length,
      clickDetails: value.clicks || []
    }));
    setData(stats);
    log("stats", "Loaded statistics");
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      {data.map((entry) => (
        <Card key={entry.shortcode} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Short URL: <a href={`/${entry.shortcode}`} target="_blank" rel="noreferrer">{`http://localhost:3000/${entry.shortcode}`}</a>
            </Typography>
            <Typography>Original URL: {entry.originalUrl}</Typography>
            <Typography>Created At: {new Date(entry.createdAt).toLocaleString()}</Typography>
            <Typography>Expires At: {new Date(entry.expiry).toLocaleString()}</Typography>
            <Typography>Total Clicks: {entry.clicks}</Typography>

            {entry.clickDetails.length > 0 && (
              <>
                <Typography variant="subtitle1" mt={2}>
                  Click Details
                </Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {entry.clickDetails.map((click, index) => (
                      <TableRow key={index}>
                        <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                        <TableCell>{click.source || "Direct"}</TableCell>
                        <TableCell>{click.location || "Unknown"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default StatsTable;
