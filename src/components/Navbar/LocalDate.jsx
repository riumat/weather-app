

const LocalDate = () => {
  const date = new Date();
  const time = date.toLocaleString("it", { month: "long", day: "numeric", year: "numeric" })
  return (
    <div>
      {time}
    </div>
  )
}

export default LocalDate

