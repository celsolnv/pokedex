interface IListItem {
  currentPage: number
  pageIndex: number
}
export const ListItem = ({ currentPage, pageIndex, ...props }: IListItem): JSX.Element => (
  <li {...props}>
    <a className={`number ${(pageIndex) === currentPage && 'number-active'}`}>
      {pageIndex}
    </a>
</li>
)
