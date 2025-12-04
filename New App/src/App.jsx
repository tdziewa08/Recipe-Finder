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


NEW PSEUDO...

  Step 1: User Input Collection
  User enters ingredient name, amount, and unit through form inputs✅
  App stores each ingredient in an array with ID, name, amount, unit✅
  User can add multiple ingredients to build their pantry list✅
  User can remove ingredients from their list if needed✅

  Step 2: Recipe Matching Process
  When user requests recipes, app loops through all available recipes in database✅
  For each recipe, check if user's ingredients contain the recipe's required ingredients✅
  Count how many recipe ingredients the user actually has available✅
  Apply ingredient substitution rules where applicable (butter = oil, etc.)✅

  Step 3: Recipe Filtering and Ranking
  Filter out recipes where user has too few matching ingredients
  Sort remaining recipes by number of ingredient matches (highest first)
  Optionally filter by cooking time, cuisine type, or difficulty level
  Return top 3-5 best matching recipes to display

  Step 4: Recipe Results Display
  Show recipe title, cooking time, and cuisine type✅
  Display which ingredients user has vs which they need to buy🎯
  List step-by-step cooking instructions✅
  Allow user to save or favorite recipes for later🎯

  Step 5: Shopping List Generation
  For selected recipe, identify ingredients user is missing
  Create shopping list with missing ingredients and estimated quantities
  Group ingredients by store section (produce, dairy, meat, etc.)
  Allow user to export or print shopping list


*/}