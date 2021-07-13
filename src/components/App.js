import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <div className="App">
      <div className="pane top-pane">
        <Editor language="xml" name="<html>" value={html} onChange={setHtml} color="#f14041" />
        <Editor language="css" name="<style>" value={css} onChange={setCss} color="#bc92cd" />
        <Editor language="javascript" name="<script>" value={js} onChange={setJs} color="#a5e882" />
      </div>
      <div className="pane">
        <iframe srcDoc={srcDoc} title="output" sandbox="allow-scripts" frameBorder="0" width="100%" height="100%" />
      </div>
    </div>
  );
}

export default App;
