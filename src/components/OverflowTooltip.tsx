import { Box, Tooltip, Typography, TypographyTypeMap } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

interface OverflowTooltipProps {
  tooltip: string
  text: string
  css: { [key: string]: unknown }
  variant: TypographyTypeMap['props']['variant']
  color?: string
  link?: string
}

const OverflowTooltip = (props: OverflowTooltipProps) => {
  const textElementRef = useRef<HTMLInputElement | null>(null)
  const [isOverflowed, setIsOverflow] = useState(false)

  const compareSize = () => {
    if (textElementRef.current) {
      setIsOverflow(
        textElementRef.current.scrollWidth >=
          textElementRef.current.clientWidth,
      )
    }
  }

  useEffect(() => {
    compareSize()
    window.addEventListener('resize', compareSize)
    return () => {
      window.removeEventListener('resize', compareSize)
    }
  }, [])

  return (
    <Tooltip title={props.tooltip} disableHoverListener={!isOverflowed}>
      <Box
        sx={{
          ...props.css,
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {props.link ? (
          <Link to={props.link}>
            <Typography
              variant={props.variant}
              component={'span'}
              ref={textElementRef}
              color={props.color}
            >
              {props.text}
            </Typography>
          </Link>
        ) : (
          <Typography
            variant={props.variant}
            component={'span'}
            ref={textElementRef}
            color={props.color}
          >
            {props.text}
          </Typography>
        )}
      </Box>
    </Tooltip>
  )
}

export default OverflowTooltip
