import { useEffect, useState } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState(null)
  const [values, setValues] = useState(null)
  const [renderValues, setRenderValues] = useState(null)
  const [index, setIndex] = useState('')
  console.log(values)

  const fetchValues = async () => {
    const redisValues = await axios.get('/api/values/current')
    setValues(redisValues.data)
  }

  const fetchIndexes = async () => {
    const pgSeenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(pgSeenIndexes.data)
  }

  const handleSubmit = async e => {
    if (index.trim() !== '') {
      e.preventDefault()
      await axios.post('/api/values', { index })
      setIndex('')
    }
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  useEffect(() => {
    const temp = []
    for (let ind in values) {
      temp.push(
        <div key={ind}>
           For index {ind} - I calculated {values[ind]}
        </div>
      )
    }
    setRenderValues(temp)
  }, [values])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Enter your index: </span>
          <input
            type="number" 
            value={index}
            onChange={e => setIndex(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen: </h3>
      {seenIndexes && seenIndexes.map(({ number }) => number).join(', ')}

      <h3>Calculated values: </h3>
      {renderValues && renderValues.map(item => item)}
    </div>
  );
}

export default Fib;