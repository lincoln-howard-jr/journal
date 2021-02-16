
// pending actions
let pending = JSON.parse (localStorage.getItem ('pending-actions') || '[]');
const handlePending = (actions={}) => {
  localStorage.setItem ('pending-actions', []);
  pending.forEach (({action, body}) => actions [action] (body));
}

export default handlePending