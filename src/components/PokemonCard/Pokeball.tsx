interface IPokeballParams {
  backgroundColor: string
}

export function Pokeball ({ backgroundColor }: IPokeballParams): JSX.Element {
  return (
    <svg
      className="pokeball md:w-[180px] "
      viewBox="0 0 532 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="266" cy="256" rx="266" ry="256" fill={backgroundColor} />
      <circle cx="148" cy="251" r="103" fill={backgroundColor} />
      <rect y="230" width="532" height="52" fill={backgroundColor} />
    </svg>
  )
}
