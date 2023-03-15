import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function Navigation() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<div>Heyyy</div>} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Routes>
      </div>
    </Router>
  );
}
