export default function CardButton({ label, onClick }) {
  return (
    <div className="card-btn" onClick={onClick}>
      <span>{label}</span>
    </div>
  );
}
