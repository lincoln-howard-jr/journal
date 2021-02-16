export default function H2 (props) {
  return (
    <>
      <h2>{props.children}</h2>
      <h5>{!!props.short ? props.short : props.children}</h5>
    </>
  )
}