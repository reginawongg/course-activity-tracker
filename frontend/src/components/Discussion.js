import React, { useState, useEffect } from 'react'
import Heatmap from './Heatmap'
import Dropdown from './Dropdown'

function Discussion () {
  const [selected, setSelected] = useState(null)
  const [discussion, setDiscussion] = useState([])
  const [timestamps, setTimestamps] = useState([])
  const [loaded, setLoaded] = useState(false)

  // add useEffect here for discussion data
  useEffect(() => {
    setLoaded(false);
    setTimestamps([]);
    fetch(`http://localhost:4001/getDiscussions/${selected}`)
      .then(res => res.json())
      .then(discussion => {
        setDiscussion(discussion); 
        setLoaded(true);
        })
  }, [selected])

  //looks at discussion length to map it to a heatmap colour
  useEffect(() => {
      if (discussion.length > 0 ) {
        const discussionTimestamps = discussion
          .map(discussion => discussion.timestamp)

        setTimestamps(discussionTimestamps)
    }
  }, [discussion])

  return (
    <div>
      <div>
        <text>Select a course from the dropdown menu:</text>
        <Dropdown handleSelect ={setSelected} handleLoaded={setLoaded}/>
      </div>
      <div>
        <br></br>
        {timestamps.length === 0 && loaded? <text>No discussion found for selected course.</text> : <text/>}
        <br></br>
        {loaded ? <Heatmap timestamps={timestamps} /> : <div>Loading ...</div>}
      </div>
    </div>
  )
}

export default Discussion
