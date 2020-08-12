const genders = ['female', 'male', 'genderless']

export const parseGender = (id: any) => [0, 1, 2].includes(id - 1) ? genders[id - 1] : null
