const Loading = ({Title}) => {
  return (
    <>
      <Title />
      <figure>
        <img
          className="w-[200px] h-[200px] rounded-full m-auto mt-[2%]"
          src="../../assets/dance-party.gif"
          alt="Loading..."
        />
      </figure>
      <progress className="progress mx-auto mt-auto"></progress>
    </>
  )
}

export default Loading
