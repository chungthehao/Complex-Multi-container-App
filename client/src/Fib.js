import { useEffect, useState } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState(null)
  const [values, setValues] = useState(null)
  const [index, setIndex] = ''

  const fetchValues = async () => {
    const redisValues = await axios.get('/api/values/current')
    setValues(redisValues.data)
  }

  const fetchIndexes = async () => {
    const pgSeenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(pgSeenIndexes.data)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await axios.post('/api/values', { index })
    setIndex('')
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  return (
    <div>
      <form onChange={handleSubmit}>
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
      {seenIndexes && seenIndexes.map(({ number }) => number).join(', ') + '.'}

      <h3>Calculated values: </h3>
      {values && values.forEach((value, ind) => (
        <div key={ind}>
          For index {ind} - I calculated {value}
        </div>
      ))}
    </div>
  );
}

export default Fib;