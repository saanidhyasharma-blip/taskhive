export default function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-card-bg border border-card-border rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}
