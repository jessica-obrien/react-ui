import { Checkbox, FormControlLabel, FormGroup, Tooltip } from '@mui/material'
import { ConnectionFormFields } from 'components/GardenConnectionForm'
import { useFormikContext } from 'formik'

interface ConnectionCheckboxGroupProps {
  id: string
  label: string
  tooltip?: string
}

const ConnectionCheckboxGroup = ({
  id,
  label,
  tooltip,
}: ConnectionCheckboxGroupProps) => {
  const context = useFormikContext<ConnectionFormFields>()
  return (
    <FormGroup sx={{ width: '20%' }}>
      <Tooltip title={tooltip || ''}>
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              name={id}
              checked={Boolean(context.values[id])}
              onChange={context.handleChange}
            />
          }
          label={label}
          sx={{ mt: 1, pr: 1 }}
        />
      </Tooltip>
    </FormGroup>
  )
}

export { ConnectionCheckboxGroup }