import MyBrowser from "./components/MyBrowser";

function App() {
  return (
    <div className="App">
      <MyBrowser
        extendedFolders={['Common7', 'Common7/IDE', 'DIA SDK/bin/amd64']}
      />
    </div>
  );
}

export default App;
