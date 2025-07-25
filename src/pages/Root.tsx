import { Outlet } from 'react-router-dom';

function Root() {
  return (
    <main className="container mx-auto px-4">
      <Outlet />
    </main>
  );
}

export default Root;
