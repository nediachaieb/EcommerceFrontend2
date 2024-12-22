import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Insertarticle from "./components/admin/articles/Insertarticle"
import Editarticle from "./components/admin/articles/Editarticle"
import Listcategories from "./components/admin/categories/Listcategories"
import Insertcategorie from "./components/admin/categories/Insertcategorie"
import Editcategorie from "./components/admin/categories/Editcategorie"
import Listscategories from "./components/admin/scategories/Listscategories"
import Insertscategorie from "./components/admin/scategories/Insertscategorie"
import Editscategorie from "./components/admin/scategories/Editscategorie"
import Menu from "./components/admin/Menu"
import Home from "./components/admin/Home"
import ListArticles from "./components/admin/articles/Listarticles"
import Listarticlecard from "./components/client/Listarticlecard"
import { CartProvider } from "use-shopping-cart";
import Cart from "./components/client/Cart"
import Success from './components/client/shopping/Success'
import Cancel from './components/client/shopping/Cancel'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Menu />
        <Routes>

          <Route path="/articles" element={<ListArticles />} />
          <Route path="/articles/add" element={<Insertarticle />} />
          <Route path="/articles/edit/:id" element={<Editarticle />} />
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Listcategories />} />
          <Route path="/categories/add" element={<Insertcategorie />} />
          <Route path="/categories/edit/:id" element={<Editcategorie />} />

          <Route path="/scategories" element={<Listscategories />} />
          <Route path="/scategories/add" element={<Insertscategorie />} />
          <Route path="/scategories/edit/:id" element={<Editscategorie />} />
          <Route path="/client" element={<Listarticlecard />} />

          <Route path="/cart" element={<Cart />} />

          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Routes>


      </Router>
    </CartProvider>

  )
}

export default App
