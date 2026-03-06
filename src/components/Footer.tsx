const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container text-center">
        <p className="text-sm text-muted-foreground font-mono">
          © {new Date().getFullYear()} ManojKumar D. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
