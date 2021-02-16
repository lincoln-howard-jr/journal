const titles = {
  write: {
    long: () => 'Write Your Journal Entry',
    short: () => 'Check In'
  },
  journal: {
    long: () => 'Review Your Journal Entries',
    short: () => 'Therapy Journal'
  },
  settings: {
    long: () => 'Customize Your Therapy Journal',
    short: () => 'Customize'
  },
  skills: {
    long: () => 'Coping Skills Reference Sheet',
    short: () => 'Coping Skills'
  },
  sharing: {
    long: name => `Therapy Journal From ${name}`,
    short: name => `Therapy Journal`
  }
}
export default (page) => {
  return titles [page]
}