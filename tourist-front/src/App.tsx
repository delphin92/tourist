import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Menu from "./pages/Menu/Menu";
import HikingScreen from "./pages/HikingScreen/HikingScreen";

const App: React.FC = () => {
  return (
    <div className="App">
      <Switch>
          <Route exact path="/" component={Menu}/>
          <Route path="/hiking" component={HikingScreen}/>
      </Switch>
    </div>
  );
};

export default App;
