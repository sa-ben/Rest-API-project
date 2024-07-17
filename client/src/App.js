import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './tasks/TasksList';
import AddTask from './tasks/AddTask';
import Layout from './common/Layout';
import PostsList from './posts/PostsList';
import AddPost from './posts/AddPost';
import HomePage from './common/HomePage'
import UsersList from './users/UsersList';
import AddUser from './users/AddUser';
import PhotosList from './photos/PhotosList';
import AddPhoto from './photos/AddPhoto';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={ <HomePage />} />
            {/* welcome {user}
            your recent enter was at {}
            you have {} tasks waiting for done
            you have {} photos and {} posts at your library
            enjoy connecting! */}
            <Route path='/tasks' element={<TaskList />} />
            <Route path='/posts' element={<PostsList />} />
            <Route path='/users' element={<UsersList />} />
            <Route path='/photos' element={<PhotosList />} />
            <Route path='/tasks/add' element={<AddTask />} />
            <Route path='/posts/add' element={<AddPost />} />
            <Route path='/users/add' element={<AddUser />} />
            <Route path='/photos/add' element={<AddPhoto />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
