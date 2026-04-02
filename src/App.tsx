import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ScenarioList from './pages/ScenarioList'
import ScenarioDetail from './pages/ScenarioDetail'
import CodeLab from './pages/CodeLab'
import Glossary from './pages/Glossary'
import Quiz from './pages/Quiz'
import Progress from './pages/Progress'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scenarios" element={<ScenarioList />} />
        <Route path="/scenarios/:id" element={<ScenarioDetail />} />
        <Route path="/code-lab" element={<CodeLab />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Layout>
  )
}

export default App
