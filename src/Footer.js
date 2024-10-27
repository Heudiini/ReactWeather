import React from "react";
import "./css/App.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        {" "}
        © 2022 by heudiini.
        <a
          href="https://github.com/Heudiini/React-Weather"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Opensource code here.{" "}
        </a>
        <a href="https://giphy.com/gifs/animation-animated-free-gZEBpuOkPuydi">
          Gifs from GIPHY{" "}
        </a>
      </footer>
    </div>
  );
}
