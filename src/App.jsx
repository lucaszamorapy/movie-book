import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/footer/Footer";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <main className="AppBody">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchpage" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MoviePage />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
