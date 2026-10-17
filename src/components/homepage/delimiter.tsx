function Delimiter({
  index = 0,
  lastIndex = 1,
}: {
  index?: number;
  lastIndex?: number;
}) {
  return <>{index < lastIndex ? <div className="linia"></div> : <br />}</>;
}

export default Delimiter;
