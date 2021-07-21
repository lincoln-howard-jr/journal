export default function H1 (props) {
  return (
    <>
      <h1 className="long">{props.children}</h1>
      <h1 className="short">{!!props.short ? props.short : props.children}</h1>
    </>
  )
}