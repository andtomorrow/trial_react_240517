export function FilterForm({ keyword, setKeyword, hideCompletedFilter, setHideCompletedFilter }) {
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <label>
        <input type="checkbox" value={hideCompletedFilter} onChange={(e) => setHideCompletedFilter(e.target.checked)} />
        Hide Completed
      </label>
    </div>
  )
}
