import {useCounterStore} from './zustand'

export default function Main() {
  const {count, increment, decrement} = useCounterStore()
  return (
    <div>
      <h1 className="text-3xl font-bold text-green-500 underline">
        Hello world!
      </h1>
      <section>
        <h3>Counter</h3>
        <p>count : {count}</p>
        <button onClick={increment}>--i--</button>
        <button onClick={decrement}>--d--</button>
      </section>
    </div>
  )
}
