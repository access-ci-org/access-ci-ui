export default function ScrollText({ children, maxHeight = "400px" }) {
  return (
    <div className="scroll-text">
      <div className="scroll-text-inner" style={{ maxHeight }}>
        {children}
      </div>
    </div>
  );
}
