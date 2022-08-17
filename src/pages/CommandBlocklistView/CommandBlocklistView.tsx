import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Button, IconButton, Tooltip } from '@mui/material'
import Divider from 'components/divider'
import { generateCommandName } from 'components/generateCommandName'
import { ModalWrapper } from 'components/ModalWrapper'
import PageHeader from 'components/PageHeader'
import { Table } from 'components/Table'
import { useBlockList } from 'hooks/useBlockList'
import { useCommands } from 'hooks/useCommands'
import { differenceWith } from 'lodash'
import { useModalColumns, useTableColumns } from 'pages/CommandBlocklistView'
import { useMemo, useState } from 'react'
import { CommandBase, CommandRow } from 'types/custom_types'

export const CommandBlocklistView = () => {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState<CommandRow[]>([])
  const { getBlockList, deleteBlockList, addBlockList } = useBlockList()
  const { commands } = useCommands()
  const blocked = getBlockList()

  // populate data for modal All Commands list table
  const commandListData = useMemo(() => {
    // Filter out blocked commands first
    return differenceWith(commands, blocked, (commandItem, blockItem) => {
      return (
        commandItem.namespace === blockItem.namespace &&
        commandItem.system === blockItem.system &&
        commandItem.command === blockItem.command
      )
    }).map((command: CommandRow): CommandRow => {
      return {
        namespace: command.namespace,
        system: command.system,
        command: command.command,
        name: command.name,
      }
    })
  }, [blocked, commands])

  // populate data for main Blocked Commands list table
  const blocklistData = useMemo(() => {
    const delCommand = (id: string | undefined) => {
      if (id) {
        deleteBlockList(id)
      } else {
        console.error('Command had no ID - cannot delete')
      } // TODO: search for command + system + namespace combo?
    }

    return (
      blocked?.map((command: CommandBase): CommandRow => {
        return {
          namespace: command.namespace,
          system: command.system,
          status: command.status,
          command: command.command,
          name: generateCommandName(false, command.command),
          action: (
            <IconButton
              size="small"
              color="error"
              onClick={() => delCommand(command.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          ),
        }
      }) ?? []
    )
  }, [blocked, deleteBlockList])

  return (
    <Box>
      <Tooltip title="Add command">
        <Button
          style={{ float: 'right' }}
          variant="contained"
          color="primary"
          aria-label="Add command"
          onClick={() => setOpen(true)}
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <ModalWrapper
        open={open}
        header="Add Commands to Blocklist"
        onClose={() => {
          setOpen(false)
          setSelection([])
        }}
        onCancel={() => {
          setOpen(false)
          setSelection([])
        }}
        onSubmit={() => {
          addBlockList(selection)
          setOpen(false)
          setSelection([])
        }}
        content={
          <Table
            tableName="All Commands"
            data={commandListData}
            columns={useModalColumns()}
            maxRows={10}
            setSelection={setSelection}
          />
        }
      />
      <PageHeader title="Command Publishing Blocklist" description="" />
      <Divider />
      <Table
        tableName="Blocked Commands"
        data={blocklistData}
        columns={useTableColumns()}
      />
    </Box>
  )
}
