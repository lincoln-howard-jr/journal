export default function H1 (props) {
  return (
    <>
      <h3 className="long">{props.children}</h3>
      <h3 className="short">{!!props.short ? props.short : props.children}</h3>
    </>
  )
}