"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, Tab, Paper, Stack, IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { tabs } from "./tabs";

export const RouterBar = () => {
  const { push } = useRouter();
  const pathname = usePathname();

  const activeTab = tabs.findIndex((tab) => tab.path === pathname);

  return (
    <Paper
      elevation={6}
      sx={{
        borderRadius: "100px",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        pr: "25px",
      }}
    >
      <Stack
        spacing={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Tooltip title='Back to main'>
          <IconButton onClick={() => push("/main")}>
            <ArrowBackIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Tooltip>
        <Tabs
          value={activeTab}
          centered
          textColor="primary"
          indicatorColor="primary"
          onChange={(event, newValue) => {
            push(tabs[newValue].path);
          }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Stack>
    </Paper>
  );
};
