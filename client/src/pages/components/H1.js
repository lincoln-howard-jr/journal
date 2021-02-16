export default function H1 (props) {
  return (
    <>
      <h1>{props.children}</h1>
      <h4>{!!props.short ? props.short : props.children}</h4>
    </>
  )
}