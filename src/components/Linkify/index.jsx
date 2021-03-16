import React from 'react'
import LinkConverter from 'react-linkify'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyle = makeStyles(() => ({
  link: {
    color: (props) => props?.color ?? '#363636',
    textDecoration: (props) => (props?.noUnderline ? undefined : 'underline'),
    fontWeight: (props) => (props?.isBold ? 'bold' : 'normal'),

    '&:hover': {
      color: 'inherit',
      fontWeight: (props) =>
        props?.noUnderline || props?.isBold ? 'bold' : 'normal',
      textDecoration: 'underline',
    },
  },
}))

const Linkify = ({
  color,
  noUnderline,
  openInCurrent,
  children,
  className,
  isBold,
}) => {
  const classes = useStyle({ color, noUnderline, isBold })

  return (
    <LinkConverter
      componentDecorator={(href, text, key) => (
        <a
          className={clsx(classes.link, className)}
          target={openInCurrent ? undefined : '_blank'}
          href={href}
          key={key}
        >
          {text}
        </a>
      )}
    >
      {children}
    </LinkConverter>
  )
}

export default Linkify
