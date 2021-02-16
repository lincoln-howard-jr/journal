export default function H1 (props) {
  return (
    <>
      <h3>{props.children}</h3>
      <h6>{!!props.short ? props.short : props.children}</h6>
    </>
  )
}