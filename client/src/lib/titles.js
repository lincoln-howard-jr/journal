const titles = {
  write: {
    long: () => 'Write Your Journal Entry',
    short: () => 'Check In'
  },
  journal: {
    long: () => 'Review Your Journal Entries',
    short: () => 'Journal'
  },
  settings: {
    long: () => 'Customize Your Journal',
    short: () => 'Customize'
  },
  skills: {
    long: () => 'Skills Reference Sheet',
    short: () => 'Skills'
  },
  sharing: {
    long: name => `Journal From ${name}`,
    short: name => `Journal`
  }
}
export default (page) => {
  return titles [page]
}