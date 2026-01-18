import { Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import RegistrationPage from './pages/RegistrationPage'
import QuestionnaireIntroPage from './pages/QuestionnaireIntroPage'
import QuestionPage from './pages/QuestionPage'
import ResultPage from './pages/ResultPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/intro" element={<QuestionnaireIntroPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/results" element={<ResultPage />} />

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}