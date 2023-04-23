import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage.jsx";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>${html}</html>
        <style>${css}</style>
        <script>${javascript}</script>
      `);

      return () => clearTimeout(timeout);
    }, 250);
  }, [html, css, javascript]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JavaScript"
          value={javascript}
          onChange={setJavascript}
        />
      </div>
      <div className="pane">
        <iframe
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="100%"
          frameBorder="0"
          srcDoc={srcDoc}
        />
        {/* sanbox="allow-scripts" is used for security purpose so that codepen code cannot access other things like cookies */}
      </div>
    </>
  );
}

export default App;
