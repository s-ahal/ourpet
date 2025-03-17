import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe(App, () => {
  it("renders InteractionButton components", () => {
    render(<App />);
    const cleanButton = screen.getByRole("button", { name: "clean" });
    const playButton = screen.getByRole("button", { name: "play" });
    const feedButton = screen.getByRole("button", { name: "feed" });
    expect(cleanButton).toBeInTheDocument();
    expect(playButton).toBeInTheDocument();
    expect(feedButton).toBeInTheDocument();
  });

  it("opens and closes the menu", () => {
    render(<App />);
    const openMenuButton = screen.getByText("Open Menu");
    fireEvent.click(openMenuButton);
    const closeMenuButton = screen.getByText("X");
    expect(closeMenuButton).toBeInTheDocument();
    fireEvent.click(closeMenuButton);
    expect(closeMenuButton).not.toBeInTheDocument();
  });

  it("updates pet stats upon interaction", async () => {
    render(<App />);
    const happinessStat = await screen.findByText(/happiness: \d/i);
    const happinessValue = parseInt(
      happinessStat.textContent?.slice(-2) || "0"
    );
    console.log(happinessValue);

    const playButton = screen.getByRole("button", { name: "play" });
    fireEvent.click(playButton);
    await new Promise((r) => setTimeout(r, 1000)); //give it a second to update

    const updatedHappinessStat = await screen.findByText(/happiness: \d/i);
    const updatedHappinessValue = parseInt(
      updatedHappinessStat.textContent?.slice(-2) || "0"
    );
    console.log(updatedHappinessValue);

    expect(updatedHappinessValue - happinessValue).toBe(10);
  });
});
