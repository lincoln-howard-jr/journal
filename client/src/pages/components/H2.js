export default function H2 (props) {
  return (
    <>
      <h2 className="long">{props.children}</h2>
      <h2 className="short">{!!props.short ? props.short : props.children}</h2>
    </>
  )
}