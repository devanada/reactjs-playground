export default function Button(props) {
  const { label } = props;
  return (
    <button className="btn btn-neutral btn-wide" {...props}>
      {label}
    </button>
  );
}
