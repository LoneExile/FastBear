const DetectCurrentUrl = (props: {
  isDetectFill: boolean
  matchFillName: string
}) => {
  if (props.isDetectFill) {
    return (
      <>
        <div className="flex flex-wrap justify-around p-2 mb-2 mt-3 border-2 rounded-md border-slate-900 items-center">
          <div className="badge badge-success gap-2">Detected</div>
          <div className="text-base font-bold border-1 rounded-md text-center bg-secondary border-transparent p-[2%] px-[4%]">
            {props.matchFillName}
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <div className="flex flex-wrap justify-around p-2 mb-2 mt-3 border-2 rounded-md border-slate-900 items-center">
          <div className="badge badge-error gap-2">Not Detected</div>
          <div className="text-base font-bold border-1 rounded-md text-center bg-secondary border-transparent p-[2%] px-[4%]">
            {'🫠🫠🫠🫠'}
          </div>
        </div>
      </>
    )
  }
}

export default DetectCurrentUrl
