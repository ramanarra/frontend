import React from 'react'
import { Button } from '@material-ui/core'

const Footer = ({ handlePagination, totalCount, pagination }) => {
  const hasNext = pagination <= totalCount - 15
  const hasPrev = pagination - 15 >= 0 && totalCount > 15

  const onPagination = (isPrev) => {
    handlePagination({
      target: {
        name: 'paginationStart',
        value:
          isPrev && hasPrev
            ? pagination - 15
            : !isPrev && hasNext
            ? pagination + 15
            : pagination,
      },
    })
  }

  console.log(hasPrev, hasNext, totalCount)

  return (
    !!totalCount && (
      <div className="doc-report-footer">
        <div className="btn-wrap">
          {hasPrev && (
            <Button className="prev-btn btn" onClick={onPagination.bind(this, true)}>
              Previous
            </Button>
          )}
          {hasNext && (
            <Button
              className="next-btn btn"
              onClick={onPagination.bind(this, false)}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    )
  )
}

export default Footer
