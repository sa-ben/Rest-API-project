import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './tasks/TaskList';
import AddTask from './tasks/AddTask';
import Layout from './common/Layout';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<h1>Home page</h1>} />
            <Route path='/tasks' element={<TaskList />} />
            <Route path='/tasks/add' element={<AddTask />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
