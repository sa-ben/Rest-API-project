import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './tasks/TaskList';
import AddTask from './tasks/AddTask';
import Layout from './common/Layout';
import PostList from './posts/PostList';
import AddPost from './posts/AddPost';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<h1> Home page </h1>} />
            {/* welcome {user}
            your recent enter was at {}
            you have {} tasks waiting for done
            you have {} photos and {} posts at your library
            enjoy connecting! */}
            <Route path='/tasks' element={<TaskList />} />
            <Route path='/posts' element={<PostList />} />
            <Route path='/tasks/add' element={<AddTask />} />
            <Route path='/posts/add' element={<AddPost />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
