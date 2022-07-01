import HandleRoute from "./components/ROUTES/HandleRoute";
import BlogState from "./context/BlogState";
import UserState from './context/UserState'

function App() {
  return (
    <UserState>
      <BlogState>
        <HandleRoute />
      </BlogState>
    </UserState>
    );
}

export default App;
