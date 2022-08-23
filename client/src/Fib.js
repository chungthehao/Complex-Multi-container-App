import { useEffect, useState } from 'react'
import axios from 'axios'

function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = ''

  const fetchValues = async () => {
    const redisValues = await axios.get('/api/values/current')
    setValues(redisValues.data)
  }

  const fetchIndexes = async () => {
    const pgSeenIndexes = await axios.get('/api/values/all')
    setSeenIndexes(pgSeenIndexes.data)
  }

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])

  return (
    <div>

    </div>
  );
}

export default Fib;