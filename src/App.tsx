import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AppLayout } from "@/components/layout/AppLayout"
import { Dashboard } from "@/pages/Dashboard"
import { Transactions } from "@/pages/Transactions"
import ParticleField from "@/components/ParticleField"
import "./i18n" // initialize i18n

function App() {
  return (
    <>
      <ParticleField />
      <Router>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  )
}

export default App
