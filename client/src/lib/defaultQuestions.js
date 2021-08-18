export const measurementMap = {
  'default-5': 1,
  'default-6': 0,
  'default-7': null
} 
export const settingMap =  {
  'default-0': '...',
  'default-1': '...',
  'default-2': '...'
}
export const defaultQuestions = [
  {
    id: 'default-0',
    unit: 'string',
    prompt: 'What have I done today?',
    frequency: 'as needed'
  },
  {
    id: 'default-1',
    unit: 'string',
    prompt: 'How do I feel?',
    frequency: 'as needed'
  },
  {
    id: 'default-2',
    unit: 'string',
    prompt: 'What else am I going to do today?',
    frequency: 'as needed'
  },
  {
    id: 'default-4',
    unit: 'string',
    prompt: 'What are my goals this week?',
    frequency: 'weekly'
  }
]
export const defaultMetrix = [
  {
    id: 'default-5',
    unit: 'number',
    range: [1, 10],
    step: 1,
    prompt: 'How would I rate how I feel right now?',
    frequency: 'as needed',
    isDefault: true
  },
  {
    id: 'default-6',
    unit: 'number',
    range: [0, 16],
    step: 0.25,
    prompt: 'How much sleep did I get last night?',
    frequency: 'daily',
    unitLabel: 'hours',
    isDefault: true
  },
  {
    id: 'default-7',
    unit: 'boolean',
    prompt: 'Did I accomplish my goals this week?',
    frequency: 'weekly',
    isDefault: true
  },
]
export default [
  ...defaultQuestions,
  ...defaultMetrix
]