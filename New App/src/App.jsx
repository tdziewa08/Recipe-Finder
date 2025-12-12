import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./Layout.jsx"
import Home from "./components/Home.jsx"
import SavedRecipesList from "./components/SavedRecipesList.jsx"
import ShoppingList from "./components/ShoppingList.jsx"

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="saved" element={<SavedRecipesList />} />
            <Route path="shopping-list" element={<ShoppingList />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}