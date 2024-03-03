import "./Section.css";

export default function Section({ className, title, children }) {
  return (
    <section className={`Section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}