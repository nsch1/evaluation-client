const getRandomNumber = (max) => {
  return Math.round(Math.random() * max)
}

const getColorArray = (num) => {
  if(num <= 53) return ['RED', 'GREY']
  if(num > 53 && num <= 81) return ['YELLOW']
  if(num > 81) return ['GREEN']
}

const filterStudents = (students, colorArray) => {
  return students.filter(s => {
    const studentColor = s.evaluations[0] ? s.evaluations[0].color.toUpperCase() : 'GREY'
    return colorArray.indexOf(studentColor) !== -1
  })
}

export const getRandomStudentId = (students) => {
  const num = getRandomNumber(100)
  const colorArray = getColorArray(num)
  const filteredStudents = filterStudents(students, colorArray)

  if(!filteredStudents[0]) return getRandomStudentId(students)
  return filteredStudents[Math.floor(Math.random() * filteredStudents.length)].id
}