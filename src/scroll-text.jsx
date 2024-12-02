export default function ScrollText({ children, maxHeight = "400px" }) {
  return (
    <div class="scroll-text">
      <div class="scroll-text-inner" style={{ maxHeight }}>
        {children}
      </div>
    </div>
  );
}
