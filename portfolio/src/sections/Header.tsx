export const Header = () => {
  return (
    <div className="fixed top-0 left-0 w-full py-5 flex justify-center items-center bg-transparent z-50">
      <nav className="flex justify-center items-center gap-1 p-0.5 border border-white/15 rounded-full bg-white/10 backdrop-blur">
        <a href="#hero" className="nav-item">
          Home
        </a>
        <a href="#about" className="nav-item">
          About
        </a>
        <a href="#project" className="nav-item">
          Projects
        </a>
      </nav>
    </div>
  );
};
