import React, { useState, useEffect } from 'react'

function Dropdown(props) {
  const [courses, setCourses] = useState([])

  //useEffect to fetch information from courses
  useEffect(() => {
    fetch('http://localhost:4001/getCourses')
      .then(res => res.json())
      //filters courses to remove ones that are access restricted
      .then(data => {
        let everyCourse = [];
        for(let i = 0; i < data.length; i++){
          if(!("access_restricted_by_date" in data[i])){
            everyCourse.push(data[i]);
          }
        }
        setCourses(everyCourse);
      })
  }, [])

  //handle change events when user selects a different course
  function handleChange(e){
    props.handleSelect(e.target.value);
  }
  let aOption = (course) => {
    return <option key ={course.id} value ={course.id}>{course.name}</option>
  };

  return (
    <div>
    <select value = {null} onChange = {handleChange}>
      {courses.map(aOption)}
    </select>
    </div>
  )
}

export default Dropdown
