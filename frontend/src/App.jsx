import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'
import Login from './pages/login'
import Produtos from './pages/Produtos'
function ProdutosPlaceholder() {
  return <div>Página de produtos</div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path="/produtos" element={<Produtos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App