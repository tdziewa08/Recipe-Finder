import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home.jsx"
import IngredientList from "./components/IngredientList.jsx"

export default function App() {
  return (
    <>
      <Home />
      {/* <IngredientList /> */}
    </>
  )
}

{/*
  1. User inputs ingredients they currently have in their kitchen
  2. App searches recipe database and filters recipes by available ingredients 
  3. System calculates "completeness score" and missing ingredients for each recipe
  4. App ranks recipes by feasibility, nutrition, and user preferences
  5. Display optimized recipe suggestions with shopping lists for missing items
*/}